<?php

namespace App\Http\Controllers;

use App\Models\Tracker;
use Illuminate\Http\Request;
use App\Http\Requests\Tracker\TrackerStoreRequest;

class TrackerController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only([
            'keyword',
            'project_id',
        ]);

        return Tracker::when(isset($filters['project_id']),  function ($query) use ($filters) {
            $query->where('project_id', $filters['project_id'])
                ->orWhere('project_id', null);
        })->when(isset($filters['keyword']),  function ($query) use ($filters) {
            $query->where('name', 'like', '%' . $filters['keyword'] . '%');
        })->get();
    }

    public function store(TrackerStoreRequest $request)
    {
        return Tracker::create($request->only('name'));
    }

    public function show($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $tracker = Tracker::find($id);
        $tracker->update($request->only('name'));

        return $tracker;
    }

    public function destroy($id)
    {
        $tracker = Tracker::destroy($id);

        return $id;
    }
}
