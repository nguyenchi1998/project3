<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\IssueStatusController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TargetVersionController;
use App\Http\Controllers\TrackerController;
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
    Route::get('profile', [AuthController::class, 'profile']);
});
Route::group(['middleware' => ['auth:sanctum', 'access:director']], function () {
    Route::resource('projects', ProjectController::class);
    Route::get('projects/{id}/tracker-issues-statistic', [ProjectController::class, 'trackerIssuesStatistic']);
    Route::get('projects/{id}/priority-issues-statistic', [ProjectController::class, 'priorityIssuesStatistic']);
    Route::get('projects/{id}/members', [ProjectController::class, 'getMembers']);
    Route::post('projects/{id}/members', [ProjectController::class, 'addMember']);
    Route::put('projects/{id}/members/{memberId}', [ProjectController::class, 'updateMember']);
    Route::delete('projects/{id}/members/{memberId}', [ProjectController::class, 'removeMember']);
    Route::get('projects/{id}/issues', [ProjectController::class, 'getIssues']);
    Route::get('projects/{id}/target-versions', [ProjectController::class, 'getTargetVersions']);
    Route::resource('groups', GroupController::class);
    Route::resource('languages', LanguageController::class);
    Route::resource('users', UserController::class);
    Route::resource('issues', IssueController::class);
    Route::post('issues/{id}/toggle-link-relative-issue', [IssueController::class, 'toggleLinkRelativeIssue']);
    Route::post('issues/{id}/remove-link-sub-issue', [IssueController::class, 'removeLinkSubIssue']);
    Route::resource('trackers', TrackerController::class);
    Route::resource('target-versions', TargetVersionController::class);
    Route::resource('issue-states', IssueStatusController::class);
});
Route::resource('employees', EmployeeController::class);
