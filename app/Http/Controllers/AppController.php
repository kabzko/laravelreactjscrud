<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AppController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('app');
    }

    public function changeRole(Request $request) {
        $user = User::findOrFail($request->id);
        $user->role_id = $request->role;
        $user->save();
        return response()->json([
            'data' => 'Role Update Successfully!'
        ]);
    }
}
