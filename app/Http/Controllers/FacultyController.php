<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Faculty;

class FacultyController extends Controller
{
    public function index()
    {
        $faculties = Faculty::orderBy('id', 'DESC')->paginate(10);
        return view('faculty.index', compact('faculties'));
    }

    public function create()
    {
        return view('faculty.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'faculty_th' => 'required',
            'faculty_en' => 'required',
        ]);
        Faculty::create($request->post());

        return redirect()->route('faculty.index')->with('success','เพิ่มข้อมูลสำเร็จ');
    }

    
    public function show(Faculty $faculty)
    {
        return view('faculty.show', compact('faculty'));
    }

    public function edit(Faculty $faculty)
    {
        return view('faculty.edit', compact('faculty'));
    }

    public function update(Request $request, Faculty $faculty)
    {
        $request->validate([
            'faculty_th' => 'required',
            'faculty_en' => 'required',
        ]);
        $faculty->fill($request->post())->save();
        return redirect()->route('faculty.index')->with('success','แก้ไขข้อมูลสำเร็จ');
    }

    public function destroy(Faculty $faculty){
        $faculty->delete();
        return redirect()->route('faculty.index')->with('success','ลบข้อมูลสำเร็จ');
    }
}
