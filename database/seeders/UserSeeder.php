<?php

namespace Database\Seeders;

use App\Models\Language;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages = Language::all()->pluck('id')->toArray();

        User::factory(1)->create([
            'email' => 'admin@gmail.com',
            'position' => config('constants.position.director')
        ]);
        User::factory(4)->create([
            'position' => config('constants.position.manager')
        ])->each(function ($user) use ($languages) {
            $user->languages()->sync(array_rand($languages, 3));
        });
        User::factory(20)->create()
            ->each(function ($user) use ($languages) {
                $user->languages()->sync(array_rand($languages, 3));
            });
    }
}