<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Student;
use App\Models\Vaccine;

class VaccineRecord extends Model
{
    use HasFactory;
    protected $table = 'vaccine_record';
    protected $fillable = 
    [
        'std_id',
        'vac_id', 
        'vaccined_date',
    ];
    public function student()
    {
        return $this->belongsTo(Student::class, 'std_id');
    }
    public function vaccine()
    {
        return $this->belongsTo(Vaccine::class, 'vac_id');
    }

}
