<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index()
    {
        return Group::all()->load('division');
    }

    public function store(Request $request)
    {
        return Group::create($request->all());
    }

    public function show($id)
    {
        return Group::find($id);
    }

    public function update(Request $request, $id)
    {
        $group = Group::find($id);
        $group->update($request->all());

        return $group;
    }

    public function destroy($id)
    {
        $group = Group::destroy($id);

        return $group;
    }
}
