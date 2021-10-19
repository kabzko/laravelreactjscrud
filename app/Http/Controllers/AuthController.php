<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use App\Models\User;
use App\Models\Role;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = RouteServiceProvider::HOME;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return view('app');
    }

    public function login(Request $request)
    {
        if (!Auth::attempt(['email' => $request['email'], 'password' => $request['password']])) {
            return response()->json(['message' => 'Invalid Credentials']);
        }

        $token = $request->user()->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'user' => $request->user(),
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        Auth::logout();
    }
}
