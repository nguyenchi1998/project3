<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\Position;
use App\Models\Project;
use App\Models\TargetVersion;
use App\Models\User;
use Exception;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $languages = Language::all()->pluck('id')
            ->toArray();
        $managers = User::whereHas('position', function ($query) {
            $query->whereIN('id', [
                config('constant.position.division_manager'),
                config('constant.position.group_manager')
            ]);
        })->pluck('id');
        $employee = User::whereHas('position', function ($query) {
            $query->where('id', config('constant.position.dev'));
        })
            ->pluck('id')
            ->toArray();
        Project::factory(10)
            ->create()
            ->each(function ($project) use ($languages, $managers, $employee) {
                $targetVersions = TargetVersion::factory(3)->create([
                    'project_id' => $project->id,
                ]);
                $project->languages()->sync(array_rand($languages, 2));
                // add PM to project
                $project->members()->attach([
                    $managers->random() => [
                        'role' => config('constant.project_member_role.pm')
                    ],
                ]);
                // add member to project
                $project->members()->attach(
                    array_rand($employee, 2),
                    [
                        'role' => config('constant.project_member_role.developer'),
                    ]
                );
                $project->update([
                    'current_target_version_id' => $targetVersions->first()->id,
                ]);
            });
    }
}
