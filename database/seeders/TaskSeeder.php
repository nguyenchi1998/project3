<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
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
                return $member->pivot->role === config('constants.project_member_role.project_manager');
            })->first();

            Task::factory()->count(random_int(0, 10))->create([
                'project_id' => $project->id,
                'created_user_id' => $projectPM->id,
            ]);
        });
    }
}
