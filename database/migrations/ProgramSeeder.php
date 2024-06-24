<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('program')->insert([
            [
                'program_th' => 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาคณิตศาสตร์',
                'program_en' => 'Bachelor of Science in Mathematics',
                'grad_year' => 4,
                'prg_fac_id' => 1, // คณะวิทยาศาสตร์
            ],
            [
                'program_th' => 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาชีววิทยา',
                'program_en' => 'Bachelor of Science in Biology',
                'grad_year' => 4,
                'prg_fac_id' => 1, // คณะวิทยาศาสตร์
            ],
            [
                'program_th' => 'หลักสูตรวิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมคอมพิวเตอร์',
                'program_en' => 'Bachelor of Engineering in Computer Engineering',
                'grad_year' => 4,
                'prg_fac_id' => 2, // คณะวิศวกรรมศาสตร์
            ],
            [
                'program_th' => 'หลักสูตรวิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมไฟฟ้า',
                'program_en' => 'Bachelor of Engineering in Electrical Engineering',
                'grad_year' => 4,
                'prg_fac_id' => 2, // คณะวิศวกรรมศาสตร์
            ],
            [
                'program_th' => 'หลักสูตรพาณิชยศาสตรบัณฑิต สาขาวิชาการตลาด',
                'program_en' => 'Bachelor of Business Administration in Marketing',
                'grad_year' => 4,
                'prg_fac_id' => 3, // คณะพาณิชยศาสตร์และการบัญชี
            ],
            [
                'program_th' => 'หลักสูตรพาณิชยศาสตรบัณฑิต สาขาวิชาการเงิน',
                'program_en' => 'Bachelor of Business Administration in Finance',
                'grad_year' => 4,
                'prg_fac_id' => 3, // คณะพาณิชยศาสตร์และการบัญชี
            ],
            [
                'program_th' => 'หลักสูตรนิติศาสตรบัณฑิต',
                'program_en' => 'Bachelor of Laws',
                'grad_year' => 4,
                'prg_fac_id' => 4, // คณะนิติศาสตร์
            ],
            [
                'program_th' => 'หลักสูตรบัญชีบัณฑิต',
                'program_en' => 'Bachelor of Accounting',
                'grad_year' => 4,
                'prg_fac_id' => 3, // คณะพาณิชยศาสตร์และการบัญชี
            ],
            [
                'program_th' => 'หลักสูตรศิลปกรรมศาสตรบัณฑิต สาขาวิชาออกแบบกราฟิก',
                'program_en' => 'Bachelor of Fine Arts in Graphic Design',
                'grad_year' => 4,
                'prg_fac_id' => 5, // คณะศิลปกรรมศาสตร์
            ],
            [
                'program_th' => 'หลักสูตรศิลปกรรมศาสตรบัณฑิต สาขาวิชานิเทศศาสตร์',
                'program_en' => 'Bachelor of Fine Arts in Communication Arts',
                'grad_year' => 4,
                'prg_fac_id' => 5, // คณะศิลปกรรมศาสตร์
            ],
        ]);
    }
}
