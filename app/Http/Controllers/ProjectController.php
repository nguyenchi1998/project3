<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\FilterIssueRequest;
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

    public function addMember(Request $request, $id)
    {
        $employeeData = $request->only(
            'role',
            'effort'
        );
        $project = Project::find($id);
        $project->members()->attach(
            $request->get('employeeId'),
            $employeeData
        );
        $members = $project->members()
            ->orderBy('role', 'desc')
            ->orderBy('id', 'desc')->get();

        return $members;
    }

    public function removeMember($projectId, $memberId)
    {
        $project = Project::find($projectId);
        $project->members()->detach($memberId);
        $members = $project->members()
            ->orderBy('role', 'desc')
            ->orderBy('id', 'desc')->get();

        return $members;
    }

    public function trackerIssuesStatistic($id)
    {
        return Tracker::with(['issues' => function ($query) use ($id) {
            $query->where('project_id', $id);
        }])->get();
    }

    public function getMembers($id, Request $request)
    {
        $filters = $request->only(['keyword']);
        $project = Project::find($id)
            ->load(['members' => function ($query) use ($filters) {
                $query->when(isset($filters['keyword']), function ($query) use ($filters) {
                    $query->where('name', 'like',  '%' . $filters['keyword'] . '%');
                })->orderBy('role', 'desc')->orderBy('id', 'desc');
            }]);
        $members = $project->members;

        return $members;
    }

    public function updateMember($id, $memberId, Request $request)
    {
        $updateData = $request->only(['effort', 'role']);
        $project = Project::find($id)->load(['members' => function ($query) {
            $query->orderBy('role', 'desc')
                ->orderBy('id', 'desc');
        }]);
        $project->members()->updateExistingPivot(
            $memberId,
            $updateData
        );
        $members = $project->members()
            ->orderBy('role', 'desc')
            ->orderBy('id', 'desc')->get();

        return $members;
    }

    public function getIssues($id, FilterIssueRequest $request)
    {
        $ignoreIds = $request->get('ignoreIds');
        $filters = $request->only([
            'name',
            'assigneeId',
            'authorId',
            'trackerId',
            'status',
            'priority',
            'startDate',
            'endDate',
        ]);
        $issues = Issue::where('project_id', $id)
            ->when(isset($ignoreIds), function ($query) use ($ignoreIds) {
                $query->whereNotIn('id', $ignoreIds);
            })
            ->when(count($filters), function ($query) use ($filters) {
                $query->where(function ($query) use ($filters) {
                    $query->when(isset($filters['keyword']), function ($query) use ($filters) {
                        $query->where('name', 'like', '%' . $filters['name'] . '%');
                    })->when(isset($filters['assigneeId']), function ($query) use ($filters) {
                        $query->where('assign_user_id',  $filters['assigneeId']);
                    })->when(isset($filters['authorId']), function ($query) use ($filters) {
                        $query->where('created_user_id',  $filters['authorId']);
                    })->when(isset($filters['trackerId']), function ($query) use ($filters) {
                        $query->where('tracker_id', $filters['trackerId']);
                    })->when(isset($filters['status']) && $filters['status'] != 'all', function ($query) use ($filters) {
                        $query->where('status', $filters['status']);
                    })->when(isset($filters['priority']) && $filters['priority'] != 'all', function ($query) use ($filters) {
                        $query->where('priority',  $filters['priority']);
                    })->when(isset($filters['startDate']), function ($query) use ($filters) {
                        $query->whereDate('start_date', '>=', $filters['startDate']);
                    })->when(isset($filters['endDate']), function ($query) use ($filters) {
                        $query->whereDate('end_date', '<=', $filters['endDate']);
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
