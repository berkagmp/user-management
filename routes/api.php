<?php

use Illuminate\Http\Request;

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

Route::prefix('auth')->group(function () {
    Route::post('login', 'Auth\AuthController@login');
    Route::post('register', 'Auth\AuthController@register');
});

Route::middleware('auth:api')->group(function () {
    Route::post('auth/logout', 'Auth\AuthController@logout');
    Route::get('detail', 'Auth\AuthController@get_my_info');

    Route::prefix('users')->group(function () {
        Route::get('/', 'UserController@get_users');
        Route::get('/{id}', 'UserController@get_user');
        Route::put('/{id}', 'UserController@update');
        Route::delete('/{id}', 'UserController@delete');
    });
});
