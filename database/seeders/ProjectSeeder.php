<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages = Language::all()->pluck('id')
            ->toArray();
        $managers = User::where(
            'position',
            config('constant.position.manager')
        )->get('id')->pluck('id');
        $employee = User::where(
            'position',
            config('constant.position.employee')
        )->get('id')->pluck('id')->toArray();

        \App\Models\Project::factory(10)
            ->create()
            ->each(function ($project) use ($languages, $managers, $employee) {
                $project->languages()->sync(array_rand($languages, 2));
                // add PM to project
                $project->members()->attach([
                    $managers->random() => ['role' => config('constant.project_member_role.project_manager')]
                ]);
                // add member to project
                $project->members()->attach(
                    array_rand($employee, random_int(2, 5)),
                    [
                        'role' => config('constant.project_member_role.member'),
                    ]
                );
            });
    }
}
