<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\ProjectStoreRequest;
use App\Http\Requests\Project\ProjectUpdateRequest;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Database\Eloquent\Collection|Project[]
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

        $project->languages()->attach($request->languages);

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
        $project =  Project::findOrFail($id)
            ->load([
                'members' => function ($query) {
                    return $query->orderBy('role', 'DESC');
                }, 'members.group.division', 'languages',
                'customer',
                'tasks.author',
                'tasks.assignee'
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
    public function update(ProjectUpdateRequest $request, $id)
    {
        $project = Project::findOrFail($id);

        $project->update($request->all());

        $project->languages()->sync($request->languages);

        return $project;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
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
        $employees =   User::whereNotIn('id', array_merge(
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
}
