<?php

namespace App\Http\Controllers;

use App\Http\Requests\TargetVersion\TargetVersionStoreRequest;
use App\Models\TargetVersion;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class TargetVersionController extends Controller
{
    public function index()
    {
        //
    }

    public function store(TargetVersionStoreRequest $request)
    {
        $targetVersionData = $request->only([
            'name',
            'status',
            'start_date',
            'due_date',
            'project_id',
        ]);

        return TargetVersion::create(
            $targetVersionData
        );
    }

    public function show($id)
    {
        return TargetVersion::find($id);
    }

    public function update(Request $request, $id)
    {
        $targetVersion = TargetVersion::find($id);

        $targetVersion->update($request->only(
            'name',
            'status',
            'start_date',
            'due_date',
        ));

        return $targetVersion;
    }

    public function destroy($id)
    {
        $successDeleted = TargetVersion::destroy($id);
        if ($successDeleted) {
            return $id;
        }

        return response()->json([
            'message' => 'Error',
        ], ResponseAlias::HTTP_INTERNAL_SERVER_ERROR);
    }
}
