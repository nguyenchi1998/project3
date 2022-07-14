<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Group;
use App\Models\Language;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdminRole = Role::findById(config('constant.role.super_admin'));
        $groupManagerRole = Role::findById(config('constant.role.group_manager'));
        $divisionManagerRole = Role::findById(config('constant.role.division_manager'));
        $employeeRole = Role::findById(config('constant.role.employee'));
        $languages = Language::all()
            ->pluck('id')
            ->toArray();
        $groupIds = Group::all()
            ->pluck('id')
            ->toArray();
        $superAdmin =  User::factory(1)->create([
            'name' => 'Super Admin',
            'email' => 'super-admin@gmail.com',
            'position_id' => config('constant.position.director'),
        ])->first();
        $superAdmin->assignRole($superAdminRole);
        User::factory(1)->create([
            'email' => 'division-manager@gmail.com',
            'position_id' => config('constant.position.brse'),
        ])->each(function ($user) use ($divisionManagerRole) {
            $user->assignRole($divisionManagerRole);
        });
        $groups = Group::all()->load('division');
        User::factory(count($groups))->state(new Sequence(
            fn ($sequence) => [
                'email' => 'division-' . $groups[$sequence->index]['division']['id'] . '-group-' . $groups[$sequence->index]['id'] . '-manager@gmail.com',
                'group_id' => $groups[$sequence->index]['id']
            ],
        ))->create([
            'position_id' => config('constant.position.brse'),
        ])->each(function ($user, $index) use ($groupManagerRole, $groups) {
            $user->assignRole($groupManagerRole);
            $groups[$index]->update(['group_manager_id' => $user->id]);
        });

        foreach (config('constant.position') as $position) {
            if (in_array($position, config('constant.manager_position'))) {
                continue;
            }
            User::factory(random_int(3, 10))
                ->create([
                    'group_id' => array_rand($groupIds),
                    'position_id' => $position,
                ])->each(function ($user) use ($languages, $employeeRole) {
                    $user->languages()
                        ->sync(array_rand($languages, 3));
                    $user->assignRole($employeeRole);
                });
        }
    }
}
