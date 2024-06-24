<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vaccine;

class VaccineController extends Controller
{
    public function index()
    {
        $vaccines = Vaccine::orderBy('id', 'DESC')->paginate(10);
        return view('vaccine.index', compact('vaccines'));
    }

    public function create()
    {
        return view('vaccine.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'vaccine' => 'required',
        ]);
        vaccine::create($request->post());

        return redirect()->route('vaccine.index')->with('success','เพิ่มข้อมูลสำเร็จ');
    }
    
    public function show(vaccine $vaccine)
    {
        return view('vaccine.show', compact('vaccine'));
    }

    public function edit(vaccine $vaccine)
    {
        return view('vaccine.edit', compact('vaccine'));
    }

    public function update(Request $request, vaccine $vaccine)
    {
        $request->validate([
            'vaccine' => 'required',
        ]);

        $vaccine->fill($request->post())->save();
        return redirect()->route('vaccine.index')->with('success','แก้ไขข้อมูลสำเร็จ');
    }

    public function destroy(Vaccine $vaccine){
        $vaccine->delete();
        return redirect()->route('vaccine.index')->with('success','ลบข้อมูลสำเร็จ');
    }
}
