<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\ProjectStoreRequest;
use App\Http\Requests\Project\ProjectUpdateRequest;
use App\Models\Issue;
use App\Models\Project;
use App\Models\Tracker;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Collection|Project[]
     */
    public function index(Request $request)
    {
        $type = $request->type;
        $keyword = $request->keyword;
        return Project::when(!is_null($type), function ($query) use ($type) {
            $query->where('type', $type);
        })
            ->when(!is_null($keyword), function ($query) use ($keyword) {
                $query->where('name', 'like', '%' . $keyword . '%');
            })
            ->with(['members' => function ($query) {
                $query->orderBy('role', 'DESC')
                    ->orderBy('created_at', 'DESC');
            }, 'languages'])
            ->latest()
            ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return void
     */
    public function store(ProjectStoreRequest $request)
    {
        $project = Project::create($request->all());

        $project->languages()->attach($request->get('languages'));

        $project->members()->attach([
            auth()->id() => [
                'role' => config('constant.project_member_role.project_manager')
            ]
        ]);

        return $project->load(['members' => function ($query) {
            $query->orderBy('role', 'DESC')
                ->orderBy('created_at', 'DESC');
        }, 'languages']);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return void
     */
    public function show($id)
    {
        $project = Project::findOrFail($id)
            ->load([
                'members' => function ($query) {
                    return $query->orderBy('role', 'DESC');
                }, 'members.group.division', 'languages',
                'customer',
                'issues.author',
                'issues.assignee',
                'issues.tracker'
            ]);


        return $project;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return void
     */
    public function update(Request $request, int $id)
    {
        $project = Project::findOrFail($id);

        $project->update($request->all());

        $project->languages()->sync($request->get('languages'));

        return $project;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        if ($project->delete()) {
            return response()->json([
                'message' => 'Success',
            ], ResponseAlias::HTTP_OK);
        }

        return response()->json([
            'message' => 'Error',
        ], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
    }

    public function addMembers(Request $request, $id)
    {
        $project = Project::find($id);
        $employeeIds = array_reduce($request->employeeIds, function ($employeeIds, $employeeId) {
            $employeeIds[$employeeId] = [
                'role' => intval(config('constant.project_member_role.member'))
            ];
            return $employeeIds;
        }, []);
        // add created project employee to manager
        $employeeIds[auth()->user()->id] = [
            'role' => intval(config('constant.project_member_role.project_manager'))
        ];
        $project->members()->syncWithoutDetaching(
            $employeeIds
        );
    }

    public function showEmployeeForAddMembers(Request $request, $id)
    {
        $project = Project::find($id);
        $memberIds = $project->members->pluck('id')->toArray();
        $employees = User::whereNotIn('id', array_merge(
            [auth()->user()->id],
            $memberIds
        ))->get();

        return $employees;
    }

    public function removeMember(Request $request, $id)
    {
        $project = Project::find($id);
        $project->members()->detach($request->memberId);
    }

    public function trackerIssuesStatistic($id)
    {
        return Tracker::with(['issues' => function ($query) use ($id) {
            $query->where('project_id', $id);
        }])->get();
    }

    public function getMembers($id)
    {
        $project = Project::find($id)
            ->load(['members' => function ($query) {
                $query->orderBy('id', 'desc');
            }]);
        $members = $project->members;

        return $members;
    }

    public function getIssues($id, Request $request)
    {
        $ignoreIds = $request->get('ignoreIds');
        $filters = $request->only([
            'keyword',
            'assigneeId',
            'trackerId',
            'status',
            'priority',
        ]);
        $issues = Issue::where('project_id', $id)
            ->when(isset($ignoreIds), function ($query) use ($ignoreIds) {
                $query->whereNotIn('id', $ignoreIds);
            })
            ->when(count($filters), function ($query) use ($filters) {
                $query->orWhere(function ($query) use ($filters) {
                    $query->when(isset($filters['keyword']), function ($query) use ($filters) {
                        $query->where('name', 'like', '%' . $filters['keyword'] . '%');
                    })
                        ->when(isset($filters['assigneeId']), function ($query) use ($filters) {
                            $query->where('assign_user_id',  $filters['assigneeId']);
                        })
                        ->when(isset($filters['trackerId']), function ($query) use ($filters) {
                            $query->where('tracker_id', $filters['trackerId']);
                        })
                        ->when(isset($filters['status']), function ($query) use ($filters) {
                            $query->where('status', $filters['status']);
                        })
                        ->when(isset($filters['priority']), function ($query) use ($filters) {
                            $query->where('priority',  $filters['priority']);
                        });
                });
            })
            ->orderBy('id', 'desc')->get()->load([
                'tracker',
                'author',
                'assignee',
            ]);

        return $issues;
    }
}
