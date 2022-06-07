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
    Route::group(['prefix' => 'projects/{id}/', 'middleware'=> ['is_member_project']], function () {
        Route::get('tracker-issues-statistic', [ProjectController::class, 'trackerIssuesStatistic']);
        Route::get('priority-issues-statistic', [ProjectController::class, 'priorityIssuesStatistic']);
        Route::get('members', [ProjectController::class, 'getMembers']);
        Route::post('members', [ProjectController::class, 'addMember']);
        Route::get('members/{memberId}', [ProjectController::class, 'findMember']);
        Route::put('members/{memberId}', [ProjectController::class, 'updateMember']);
        Route::delete('members/{memberId}', [ProjectController::class, 'removeMember']);
        Route::get('members/{memberId}/activities', [ProjectController::class, 'getMemberActivities']);
        Route::get('issues', [ProjectController::class, 'getIssues']);
        Route::post('issues/{issueId}/toggle-link-relative-issue', [ProjectController::class, 'toggleLinkRelativeIssue']);
        Route::post('issues/{issueId}/remove-link-sub-issue', [ProjectController::class, 'removeLinkSubIssue']);
        Route::get('target-versions', [ProjectController::class, 'getTargetVersions']);
    });
    Route::resource('groups', GroupController::class);
    Route::resource('languages', LanguageController::class);
    Route::resource('users', UserController::class);
    Route::resource('issues', IssueController::class);

    Route::resource('trackers', TrackerController::class);
    Route::resource('target-versions', TargetVersionController::class);
});
Route::resource('employees', EmployeeController::class);
Route::get('employees/{id}/projects', [EmployeeController::class, 'getProjects']);
