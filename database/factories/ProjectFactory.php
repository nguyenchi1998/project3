<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->sentence(2),
            'start_date' => null,
            'end_date' => null,
            'status' => config('constants.project_status.new'),
            'source_control' => '',
        ];
    }
}
