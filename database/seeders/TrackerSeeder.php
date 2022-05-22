<?php

namespace Database\Seeders;

use App\Models\Tracker;
use Illuminate\Database\Seeder;

class TrackerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $trackers = [
            'Backlog',
            'Task',
            'Bug',
            'Q&A',
            'Bug after Release',
            'Other',
        ];
        foreach ($trackers as $tracker) {
            Tracker::create([
                'name' => $tracker,
            ]);
        }
    }
}
