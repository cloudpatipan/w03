<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VaccineRecord;
use App\Models\Student;
use App\Models\Vaccine;
class VaccineRecordController extends Controller
{
    public function index()
    {
        $vaccine_records = VaccineRecord::orderBy('id', 'DESC')->paginate(10);
        return view('vaccine_record.index', compact('vaccine_records'));
    }

    public function create()
    {
        $students = Student::all();
        $vaccines = Vaccine::all();
        return view('vaccine_record.create', compact('students', 'vaccines'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'std_id' => 'required',
            'vac_id' => 'required',
            'vaccined_date' => 'required',
        ]);
        VaccineRecord::create($request->post());

        return redirect()->route('vaccine_record.index')->with('success', 'เพิ่มข้อมูลสำเร็จ');
    }


    public function show(VaccineRecord $vaccine_record)
    {
        return view('vaccine_record.show', compact('vaccine_record'));
    }

    public function edit(VaccineRecord $vaccine_record)
    {
        $students = Student::all();
        $vaccines = Vaccine::all();
        return view('vaccine_record.edit', compact('vaccine_record','students', 'vaccines'));
    }

    public function update(Request $request, VaccineRecord $vaccine_record)
    {
        $request->validate([
            'std_id' => 'required',
            'vac_id' => 'required',
            'vaccined_date' => 'required',
        ]);
        
        $vaccine_record->fill($request->post())->save();
        return redirect()->route('vaccine_record.index')->with('success', 'แก้ไขข้อมูลสำเร็จ');
    }

    public function destroy(VaccineRecord $vaccine_record)
    {
        $vaccine_record->delete();
        return redirect()->route('vaccine_record.index')->with('success', 'ลบข้อมูลสำเร็จ');
    }
}
