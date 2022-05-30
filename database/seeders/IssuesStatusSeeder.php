<?php

namespace Database\Seeders;

use App\Models\IssuesStatus;
use Illuminate\Database\Seeder;

class IssuesStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $issueStates = [
            [
                'New',
                'Assigned',
                'To Be Confirm',
                'Suspended',
                'Done',
                'Feedback',
            ],
            [
                'Confirmed',
                'Closed',
                'Reject',
            ]
        ];
        foreach ($issueStates as $type => $issueStatus) {
            foreach ($issueStatus as $status) {
                IssuesStatus::create([
                    'name' => $status,
                    'type' => $type,
                ]);
            }
        }
    }
}
