<?php

namespace Database\Seeders;

use App\Models\Issue;
use App\Models\Project;
use App\Models\Tracker;
use Illuminate\Database\Seeder;

class IssueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Project::with(['members'])->get()->each(function ($project) {
            // get PM project
            $projectPM = $project->members->filter(function ($member) {
                return $member->pivot->role === config('constant.project_member_role.project_manager');
            })->first();
            $trackerIds = Tracker::all()->pluck('id')->toArray();
            Issue::factory()->count(random_int(0, 100))
                ->create([
                    'project_id' => $project->id,
                    'created_user_id' => $projectPM->id,
                    'tracker_id' => $trackerIds[array_rand($trackerIds)],
                ]);
        });
    }
}
