<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthenticationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('user/login', 'App\Http\Controllers\Api\AuthenticationController@login');
Route::post('user/register', 'App\Http\Controllers\Api\AuthenticationController@register');

//using middleware for other requests
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    
    Route::get('/users', [AuthenticationController::class, 'index']);
    Route::get('/user/{id}', [AuthenticationController::class, 'show']);

    Route::post('/logout', [AuthenticationController::class, 'logout']);
});