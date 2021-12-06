<?php

namespace App\Http\Controllers\Api;

use Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Request;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\RegisterUserRequest;
use App\Http\Requests\Api\LoginUserRequest;
use App\Models\USer;

class AuthenticationController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        $search = Request::get("name", "");
        $range = Request::get("range", "");

        $query = User::where('id', '!=', auth()->user()->id);

        if ($search) {
            $query = $query->where('name', 'LIKE', '%'.$search.'%');
        }
        if ($range === 'm' || $range === 'M') {
            $d = Carbon::now()->subYear(18);
            $query = $query->whereDate('birthday', $range === 'M'? '<=' : '>', $d);
        }

        return $this->respond(
            $query->paginate(10));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->respond(User::where('id', $id)->first());

    }

    /**
     * Register a new user and return the user if successful.
     *
     * @param RegisterUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(RegisterUserRequest $request)
    {
        $user = User::create([
            'name' => $request['name'],
            'lastname' => $request['lastname'],
            'birthday' => $request['birthday'],
            'password' => bcrypt($request['password']),
            'email' => $request['email']
        ]);

        return $this->respondLogguedUser($user, true);
    }

    /**
     * Login user and return the user if successful.
     *
     * @param LoginUserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginUserRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (! Auth::once($credentials)) {
            return $this->respondFailedLogin();
        }

        return $this->respondLogguedUser(auth()->user());
    }
    
    /**
     * Logout user session
     *
     */
    public function logout()
    {
        auth()->user()->tokens()->delete();

        return $this->respondSuccess();
    }

}
