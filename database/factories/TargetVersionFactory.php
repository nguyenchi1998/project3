<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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

        return [
            'name' => 'Sprint ' . $i++,
            'status' => config('constant.target_version_status.open'),
        ];
    }
}
