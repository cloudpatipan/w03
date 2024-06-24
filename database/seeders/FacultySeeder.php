<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('faculty')->insert([
            [
                'faculty_th' => 'คณะแพทยศาสตร์',
                'faculty_en' => 'Faculty of Medicine',
            ],
            [
                'faculty_th' => 'คณะทันตแพทยศาสตร์',
                'faculty_en' => 'Faculty of Dentistry',
            ],
            [
                'faculty_th' => 'คณะเทคโนโลยีสารสนเทศ',
                'faculty_en' => 'Faculty of Information Technology',
            ],
            [
                'faculty_th' => 'คณะโลจิสติกส์',
                'faculty_en' => 'Faculty of Logistics',
            ],
            [
                'faculty_th' => 'คณะวิศวกรรมศาสตร์',
                'faculty_en' => 'Faculty of Engineering'
            ],
            [
                'faculty_th' => 'คณะพยาบาลศาสตร์',
                'faculty_en' => 'Faculty of Nursing'
            ],
            [
                'faculty_th' => 'คณะเภสัชศาสตร์',
                'faculty_en' => 'Faculty of Pharmacy'
            ],
            [
                'faculty_th' => 'คณะนิติศาสตร์',
                'faculty_en' => 'Faculty of Law'
            ],
            [
                'faculty_th' => 'คณะศิลปศาสตร์และวิทยาศาสตร์',
                'faculty_en' => 'Faculty of Arts and Sciences'
            ],
            [
                'faculty_th' => 'คณะเกษตรศาสตร์',
                'faculty_en' => 'Faculty of Agriculture'
            ]
        ]);
    }
}
