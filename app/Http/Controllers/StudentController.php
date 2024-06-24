<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Program;
class StudentController extends Controller
{
    public function index()
    {
        $students = Student::orderBy('id', 'DESC')->paginate(10);
        return view('student.index', compact('students'));
    }

    public function create()
    {
        $programs = Program::all();
        return view('student.create', compact('programs'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'sid' => 'required',
            'fname' => 'required',
            'lname' => 'required',
            'std_prg_id' => 'required',
        ]);
        student::create($request->post());

        return redirect()->route('student.index')->with('success','เพิ่มข้อมูลสำเร็จ');
    }

    
    public function show(student $student)
    {
        return view('student.show', compact('student'));
    }

    public function edit(student $student)
    {
        $programs = Program::all();
        return view('student.edit', compact('student', 'programs'));
    }

    public function update(Request $request, student $student)
    {
        $request->validate([
            'sid' => 'required',
            'fname' => 'required',
            'lname' => 'required',
            'std_prg_id' => 'required',
        ]);
        $student->fill($request->post())->save();
        return redirect()->route('student.index')->with('success','แก้ไขข้อมูลสำเร็จ');
    }

    public function destroy(student $student){
        $student->delete();
        return redirect()->route('student.index')->with('success','ลบข้อมูลสำเร็จ');
    }
}
