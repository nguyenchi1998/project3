<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->sentence(),
            'type' => $this->faker->randomElement(array_values(config('constants.task_type'))),
            'description' => $this->faker->paragraph(),
            'priority' => $this->faker->randomElement(array_values(config('constants.task_priority'))),
        ];
    }
}
