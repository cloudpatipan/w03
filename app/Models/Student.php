<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    protected $table = 'student';
    protected $fillable = 
    [
                'program_th',
                'program_en',
                'grad_year',
                'prg_fac_id'
    ];
}
