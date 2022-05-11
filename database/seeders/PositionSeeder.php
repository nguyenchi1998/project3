<?php

namespace Database\Seeders;

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
            'CTO', "Division Manager", "Group Manager", 'Employee',
        ];

        foreach ($positions as $position) {
            Position::create([
                'name' => $position
            ]);
        }
    }
}
