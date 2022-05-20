<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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


Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profile',  [AuthController::class, 'profile']);
});
Route::group(['middleware' => ['auth:sanctum', 'access:director']], function () {
    Route::resource('projects', ProjectController::class);
    Route::get('projects/{id}/add-members', [ProjectController::class, 'showEmployeeForAddMembers']);
    Route::post('projects/{id}/add-members', [ProjectController::class, 'addMembers']);
    Route::post('projects/{id}/remove-member', [ProjectController::class, 'removeMember']);
    Route::resource('groups', GroupController::class);
    Route::resource('languages', LanguageController::class);
    Route::resource('users', UserController::class);
    Route::resource('tasks', TaskController::class);
});
Route::resource('employees', EmployeeController::class);
