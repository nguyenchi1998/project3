<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\Language;
use App\Models\User;
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
        $languages = Language::all()
            ->pluck('id')
            ->toArray();
        $groupIds = Group::all()
            ->pluck('id')
            ->toArray();

        User::factory(1)->create([
            'email' => 'admin@gmail.com',
            'position' => config('constant.position.director')
        ]);
        User::factory(1)->create([
            'email' => 'marketing@gmail.com',
            'position' => config('constant.position.marketing')
        ]);
        User::factory(1)->create([
            'email' => 'employee@gmail.com',
            'position' => config('constant.position.employee')
        ]);
        User::factory(1)->create([
            'email' => 'manager@gmail.com',
            'position' => config('constant.position.manager')
        ]);
        User::factory(4)
            ->create([
                'position' => config('constant.position.manager'),
                'group_id' => array_rand($groupIds),
            ])->each(function ($user) use ($languages) {
                $user->languages()
                    ->sync(array_rand($languages, 3));
            });
        User::factory(20)
            ->create([
                'group_id' => array_rand($groupIds),
            ])
            ->each(function ($user) use ($languages) {
                $user->languages()
                    ->sync(array_rand($languages, 3));
            });
    }
}
