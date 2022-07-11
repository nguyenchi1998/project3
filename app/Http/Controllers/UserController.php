<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserStoreRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['ignoreIds', 'ignoreProjectId', 'q', 'positionId']);

        return User::when(isset($filters['ignoreIds']), function ($query) use ($filters) {
            $query->whereNotIn('id', $filters['ignoreIds']);
        })->when(isset($filters['ignoreProjectId']),  function ($query) use ($filters) {
            $project = Project::find($filters['ignoreProjectId'])->load('members');
            $memberIds = $project->members->pluck('id')->toArray();
            $query->whereNotIn('id', $memberIds);
        })->when(isset($filters['q']), function ($query) use ($filters) {
            $query->where('name', 'like', '%' . $filters['q'] . '%');
        })->when(isset($filters['positionId']), function ($query) use ($filters) {
            $query->whereHas('position', function ($query) use ($filters) {
                $query->where('id', $filters['positionId']);
            });
        })->get()->load('roles', 'position', 'group');
    }

    public function store(UserStoreRequest $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function update(UserUpdateRequest $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        return response()->json(['message' => 'Successfully delete']);
    }

    public function getProjects($employeeId, Request $request)
    {
        return Project::whereHas('members', function ($query) use ($employeeId) {
            $query->where('users.id', $employeeId);
        })->get();
    }
}
