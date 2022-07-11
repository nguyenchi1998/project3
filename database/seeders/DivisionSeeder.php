<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\Division;
use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $divisions = [
            'BN1', 'BN2-1', 'BN2-2', 'HN', 'HCM',
        ];

        foreach ($divisions as $division) {
            $division = Division::create([
                'name' => $division,
            ]);

            for ($i = 1; $i <= 3; $i++) {
                Group::create([
                    'name' => 'Group ' . $i,
                    'division_id' => $division->id
                ]);
            }
        }
    }
}
