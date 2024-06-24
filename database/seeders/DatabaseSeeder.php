<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            FacultySeeder::class,
            ProgramSeeder::class,
            StudentSeeder::class,
            VaccineSeeder::class,
            VaccineRecordSeeder::class,
        ]);
    }
}
