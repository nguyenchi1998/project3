<?php

namespace App\Http\Controllers;

use App\Models\Project;
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
        return Project::when(!is_null($type), function ($query) use ($type) {
            $query->where('type', $type);
        })->get()->load(['members', 'languages']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {
        return Project::create($request->all());
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
            ->load(['members.group.division', 'languages', 'customer', 'tasks']);


        return $project;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return void
     */
    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $project->update($request->all());

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
}
