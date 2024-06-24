<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Program;
class Faculty extends Model
{
    use HasFactory;
    protected $table = 'faculty';
    protected $fillable = 
    [
        'faculty_th',
        'faculty_en'
    ];
    public function program()
    {
        return $this->hasMany(Program::class, 'prg_fac_id');
    }
}
