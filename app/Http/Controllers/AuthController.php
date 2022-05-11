<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:sanctum', 'access:manager'])->except('login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $token = auth()->attempt($credentials);
        if ($token) {
            return response()->json([
                'access_token' => $request->user()->createToken('')->plainTextToken,
                'type' => 'Bearer',
                'user' => $request->user(),
            ]);
        }
        return response()->json([
            'message' => 'login failed wrong user credentials',
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
        return $request->user();
    }
}
