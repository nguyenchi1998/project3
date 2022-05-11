<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages = [
            '.NET C#',
            '.NET(VB, C#)',
            'Android_Java',
            'AOS',
            'C',
            'CI',
            'Dart',
            'Designer',
            'Flutter',
            'Golang_Echo',
            'HTML/CSS/JS',
            'IOS',
            'Java',
            'Kotlin',
            'Magento',
            'NodeJS',
            'Other',
            'PHP',
            'Python',
            'QA',
            'React Native',
            'ReactJS',
            'RoR',
            'Swift',
            'Unity',
            'VB6',
            'VueJS'
        ];

        foreach ($languages as $language) {
            Language::create([
                'name' => $language
            ]);
        }
    }
}
