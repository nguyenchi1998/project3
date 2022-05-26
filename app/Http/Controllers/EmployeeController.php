<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['ignoreIds']);

        return User::when(isset($filters['ignoreIds']), function ($query) use ($filters) {
            $query->whereNotIn('id', $filters['ignoreIds']);
        })->get();
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
}
