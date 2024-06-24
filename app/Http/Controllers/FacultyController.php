<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\program;

class programController extends Controller
{
    public function index()
    {
        $programs = program::orderBy('id', 'DESC')->paginate(10);
        return view('program.index', compact('programs'));
    }

    public function create()
    {
        return view('program.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'program_th' => 'required',
            'program_en' => 'required',
        ]);
        program::create($request->post());

        return redirect()->route('program.index')->with('success','เพิ่มข้อมูลสำเร็จ');
    }

    
    public function show(program $program)
    {
        return view('program.show', compact('program'));
    }

    public function edit(program $program)
    {
        return view('program.edit', compact('program'));
    }

    public function update(Request $request, program $program)
    {
        $request->validate([
            'program_th' => 'required',
            'program_en' => 'required',
        ]);
        $program->fill($request->post())->save();
        return redirect()->route('program.index')->with('success','แก้ไขข้อมูลสำเร็จ');
    }

    public function destroy(program $program){
        $program->delete();
        return redirect()->route('program.index')->with('success','ลบข้อมูลสำเร็จ');
    }
}
