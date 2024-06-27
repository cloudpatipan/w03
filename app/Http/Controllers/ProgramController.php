<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Program;
use App\Models\Faculty;
class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::orderBy('id', 'DESC')->paginate(10);
        return view('program.index', compact('programs'));
    }

    public function create()
    {
        $faculties = Faculty::all();
        return view('program.create', compact('faculties'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'program_th' => 'required',
            'program_en' => 'required',
            'grad_year' => 'required',
            'prg_fac_id' => 'required',
        ]);
        Program::create($request->post());

        return redirect()->route('program.index')->with('success','เพิ่มข้อมูลสำเร็จ');
    }

    
    public function show(Program $program)
    {
        return view('program.show', compact('program'));
    }

    public function edit(Program $program)
    {
        $faculties = Faculty::all();
        return view('program.edit', compact('program', 'faculties'));
    }

    public function update(Request $request, Program $program)
    {
        $request->validate([
            'program_th' => 'required',
            'program_en' => 'required',
            'grad_year' => 'required',
            'prg_fac_id' => 'required',
        ]);

        $program->fill($request->post())->save();
        return redirect()->route('program.index')->with('success','แก้ไขข้อมูลสำเร็จ');
    }

    public function destroy(Program $program){
        $program->delete();
        return redirect()->route('program.index')->with('success','ลบข้อมูลสำเร็จ');
    }
}
