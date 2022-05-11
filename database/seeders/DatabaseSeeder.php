<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->resetDatabase();
        $this->call(RoleSeeder::class);
        $this->call(PositionSeeder::class);
        $this->call(DivisionSeeder::class);
        $this->call(CustomerSeeder::class);
        $this->call(LanguageSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(TaskSeeder::class);
    }

    private function resetDatabase()
    {
        $tableNames = Schema::getConnection()->getDoctrineSchemaManager()->listTableNames();
        foreach ($tableNames as $name) {
            if ($name == 'migrations') {
                continue;
            }
            DB::table($name)->truncate();
        }
    }
}