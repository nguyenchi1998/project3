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
        static $i = 1;
        return [
            'name' => 'Project ' . $i++,
            'start_date' => null,
            'due_date' => null,
            'status' => config('constant.project_status.new'),
            'source_control' => '',
        ];
    }
}
