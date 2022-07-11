<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum'])->except('login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $token = auth()->attempt($credentials);
        if ($token) {
            return response()->json([
                'access_token' => $request->user()->createToken('')->plainTextToken,
                'type' => 'Bearer',
                'user' => auth()->user()->load('roles.permissions', 'permissions', 'position', 'group.division'),
            ]);
        }

        return response()->json([
            'message' => 'Login failed! Credentials not found',
        ], ResponseAlias::HTTP_UNAUTHORIZED);
    }

    public function logout()
    {
        auth('sanctum')->user()->tokens()->delete();

        return response()->json([
            'message' => 'logout success',
        ]);
    }

    public function profile(Request $request)
    {
        return auth()->user()
            ->load('roles.permissions', 'permissions', 'position', 'group.division');
    }
}
