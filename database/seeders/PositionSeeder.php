<?php

namespace Database\Seeders;

use App\Models\Level;
use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $positions = [
            'Director',
            'Division Manager',
            'Group Manager',
            'DEV',
            'BRSE',
            'Part Time',
            'QA Manual',
            'QA Auto',
            'Comtor',
            'PQA',
            'BO',
            'IT-Guy',
            'CI',
            'Marketing',
            'HR',
            'Accountant',
            'Designer',
        ];
        foreach ($positions as $position) {
            $position = Position::create([
                "name" => $position
            ]);
            for ($i = 1; $i <= 4; $i++) {
                Level::create([
                    'name' => $position->name . '-' . $i,
                    'position_id' => $position->id,
                ]);
            }
        }
    }
}
