<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Group;
use App\Models\Language;
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
        $superAdminRole = Role::findById(config('constant.role.super-admin'));
        $managerRole = Role::findById(config('constant.role.manager'));
        $employeeRole = Role::findById(config('constant.role.employee'));
        $languages = Language::all()
            ->pluck('id')
            ->toArray();
        $groupIds = Group::all()
            ->pluck('id')
            ->toArray();
        $superAdmin =  User::factory(1)->create([
            'email' => 'super-admin@gmail.com',
        ])->first();
        $superAdmin->assignRole($superAdminRole);

        User::factory(1)->create([
            'email' => 'manager@gmail.com',
        ])->each(function ($user) use ($managerRole) {
            $user->assignRole($managerRole);
        });

        User::factory(20)
            ->create([
                'group_id' => array_rand($groupIds),
            ])->each(function ($user) use ($languages, $employeeRole) {
                $user->languages()
                    ->sync(array_rand($languages, 3));
                $user->assignRole($employeeRole);
            });
    }
}
