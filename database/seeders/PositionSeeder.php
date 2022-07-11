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
        $positions = config('constant.position');
        foreach ($positions as $key => $value) {
            $position = Position::create([
                "name" => ucwords(str_replace('_', ' ', $key)),
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
