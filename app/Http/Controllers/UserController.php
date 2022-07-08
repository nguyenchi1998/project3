<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['ignoreIds', 'ignoreProjectId', 'q']);

        return User::when(isset($filters['ignoreIds']), function ($query) use ($filters) {
            $query->whereNotIn('id', $filters['ignoreIds']);
        })->when(isset($filters['ignoreProjectId']),  function ($query) use ($filters) {
            $project = Project::find($filters['ignoreProjectId'])->load('members');
            $memberIds = $project->members->pluck('id')->toArray();
            $query->whereNotIn('id', $memberIds);
        })->when(isset($filters['q']), function ($query) use ($filters) {
            $query->where('name', 'like', '%' . $filters['q'] . '%');
        })->get()
            ->load('roles');
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }

    public function getProjects($employeeId, Request $request)
    {
        return Project::whereHas('members', function ($query) use ($employeeId) {
            $query->where('users.id', $employeeId);
        })->get();
    }
}
