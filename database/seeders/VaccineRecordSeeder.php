<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VaccineRecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('vaccine_record')->insert([
        [ 'std_id' => 1, 
        'vac_id' => 1, 
        'vaccined_date' => '2023-11-10'],
        [ 'std_id' => 2,
         'vac_id' => 2, 
         'vaccined_date' => '2023-11-10'],
        [ 'std_id' => 3, 
        'vac_id' => 3, 
        'vaccined_date' => '2023-11-10'],
        [ 'std_id' => 4,
         'vac_id' => 4, 
         'vaccined_date' => '2023-11-10'],
        [ 'std_id' => 5,
         'vac_id' => 5, 
         'vaccined_date' => '2023-11-10'],
        [ 'std_id' => 6, 
        'vac_id' => 6, 'vaccined_date' => '2023-11-10'],
        [ 'std_id' => 7,
         'vac_id' => 7, 
         'vaccined_date' => '2023-11-10'],
        [ 'std_id' => 8,
         'vac_id' => 8, 
         'vaccined_date' => '2023-11-10'],
        [ 'std_id' => 9,
         'vac_id' => 9, 
         'vaccined_date' => '2023-11-10'],
        [ 'std_id' => 10,
         'vac_id' => 10,
          'vaccined_date' => '2023-11-10']
    ]);
    }
}