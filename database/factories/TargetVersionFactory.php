<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class TargetVersionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        static $i = 1;
        $startDate = $this->faker->dateTimeThisMonth();
        return [
            'name' => 'Sprint ' . $i++,
            'status' => config('constant.target_version_status.open'),
            'start_date' => $startDate,
            'due_date' => Carbon::createFromDate($startDate)->addDays(random_int(1, 7)),
        ];
    }
}
