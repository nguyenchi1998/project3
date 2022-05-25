<?php

namespace App\Http\Controllers;

use App\Http\Requests\Tracker\TrackerStoreRequest;
use App\Models\Tracker;
use Illuminate\Http\Request;

class TrackerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filters = $request->only([
            'keyword',
            'project_id',
        ]);

        return Tracker::when(isset($filters['project_id']), function ($query) use ($filters) {
            $query->where('project_id', $filters['project_id'])
                ->orWhere('project_id', null);
        })->when(isset($filters['keyword']), function ($query) use ($filters) {
            $query->where('name', 'like', '%' . $filters['keyword'] . '%');
        })->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TrackerStoreRequest $request)
    {
        return Tracker::create($request->only('name'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $tracker = Tracker::find($id);
        $tracker->update($request->only('name'));

        return $tracker;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tracker = Tracker::destroy($id);

        return $id;
    }
}
