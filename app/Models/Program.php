<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Faculty;
class Program extends Model
{
    use HasFactory;
    protected $table = 'program';
    protected $fillable = 
    [
        'program_th',
        'program_en',
        'grad_year',
        'prg_fac_id'
    ];

    public function faculty()
    {
        return $this->belongsTo(Faculty::class, 'prg_fac_id');
    }
}
