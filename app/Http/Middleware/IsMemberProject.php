<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsMemberProject
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request                                                                          $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse) $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $authProjects = auth()->user()->projects;
        if ($authProjects->contains($request->route()->parameter('id')) //check member belong to project
            || auth()->user()->position === config('constant.position.director') // auth is director
        ) {
            return $next($request);
        }

        return response()->json(
            [
            'message' => 'Access Denied'
            ], Response::HTTP_FORBIDDEN
        );
    }
}
