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
        $managerRole = Role::findById(config('constant.role.manager'));
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
            'position_id' => config('constant.position.division_manager'),
        ])->each(function ($user) use ($managerRole) {
            $user->assignRole($managerRole);
        });
        $groups = Group::all()->load('division');
        $groupManagers = User::factory(count($groups))->state(new Sequence(
            fn ($sequence) => [
                'email' => 'division-' . $groups[$sequence->index]['division']['id'] . '-group-' . $groups[$sequence->index]['id'] . '-manager@gmail.com',
            ],
        ))->create([
            'position_id' => config('constant.position.division_manager'),
        ])->each(function ($user, $index) use ($managerRole, $groups) {
            $user->assignRole($managerRole);
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
