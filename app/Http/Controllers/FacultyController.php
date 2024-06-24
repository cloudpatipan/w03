<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FacultyController extends Controller
{
    public function index()
    {
        $facultys = Faculty::orderBy('id', 'DESC')->get();
        return view('faculty.index', compact('facultys'));
    }
}
