<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = config('constant.permission');
        $roles = config('constant.role');
        foreach ($roles as $key => $role) {
            Role::create([
                'name' => $key,
            ]);
        }
        foreach ($permissions as $key =>  $permission) {
            Permission::create([
                'name' => $key,
            ]);
        }
        $superAdmin = Role::findById(config('constant.role.super_admin'));
        $superAdmin->syncPermissions(array_values(config('constant.permission')));
    }
}
