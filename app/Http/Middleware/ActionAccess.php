<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Manager;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ActionAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  Request $request
     * @param  Closure $next
     * @param  $guard
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse|Response
     */
    public function handle(Request $request, Closure $next, $guard)
    {
        $position = config('constant.position')[$guard];
        $auth = auth('sanctum')->user();
        if ($auth->position === $position) {
            return $next($request);
        }

        return response()->json(
            [
            'message' => 'access denied',
            ], ResponseAlias::HTTP_FORBIDDEN
        );
    }
}
