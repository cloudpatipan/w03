<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VaccineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('vaccine')->insert([
            ['vaccine' => 'Sinovac'],
            ['vaccine' => 'AstraZeneca'],
            ['vaccine' => 'Pfizer-BioNTech'],
            ['vaccine' => 'Moderna'],
            ['vaccine' => 'Johnson & Johnson'],
            ['vaccine' => 'Sinopharm'],
            ['vaccine' => 'Covaxin'],
            ['vaccine' => 'Sputnik V'],
            ['vaccine' => 'Abdala'],
            ['vaccine' => 'Covavax']
        ]);
    }
}
