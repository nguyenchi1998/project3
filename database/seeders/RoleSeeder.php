<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Level;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            'DEV',
            'BSE',
            'Part-time',
            'QA Manual',
            'QA Auto',
            'Comtor',
            'PQA',
            'Manager',
            'BO',
            'IT-GUY',
            'CI',
            'Marketing',
            'HR',
            'Accountant',
            'Designer'
        ];
        foreach ($roles as $role) {
            $role = Role::create([
                'name' => $role,
            ]);
            for ($i = 1; $i <= 4; $i++) {
                Level::create([
                    'name' => $role . $i,
                    'role_id' => $role->id
                ]);
            }
        }
    }
}
