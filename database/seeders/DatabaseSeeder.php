<?php

namespace Database\Seeders;

use Doctrine\DBAL\Exception;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     * @throws Exception
     */
    public function run()
    {
        $this->resetDatabase();
        $this->call(TrackerSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(PositionSeeder::class);
        $this->call(DivisionSeeder::class);
        $this->call(CustomerSeeder::class);
        $this->call(LanguageSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(ProjectSeeder::class);
        $this->call(IssueSeeder::class);
    }

    /**
     * @throws Exception
     */
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
