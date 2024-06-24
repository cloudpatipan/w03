@extends('layouts.app')

@section('title')
    Student Create
@endsection

@section('content')

<div class="card mt-5 w-[80%] mx-auto">
    <h2 class="card-header text-center font-semibold">Student Create</h2>
    <div class="card-body">
        
        @if(session('success'))
            <div class="alert alert-success" role="alert">{{ session('success') }}</div>
        @endif

        <button class="border rounded-lg px-2">
            <a href="{{ route('student.index') }}"><i class="fa fa-plus"></i> back</a>
        </button>

            <form class="my-4" action="{{ route('student.store') }}" method="POST">
                @csrf
                <div class="mb-3">
                    <label class="form-label block"><strong>Student Identification ID:</strong></label>
                    <input 
                        type="number" 
                        name="sid" 
                        class="border px-2 rounded-lg @error('sid') is-invalid @enderror" 
                        id="inputName" 
                        placeholder="Student Identification ID">
                    @error('sid')
                        <div class="form-text text-red-700">{{ $message }}</div>
                    @enderror
                </div>
    
                <div class="mb-3">
                    <label class="form-label block"><strong>First Name:</strong></label>
                    <input 
                        type="text" 
                        name="fname" 
                        class="border px-2 rounded-lg @error('fname') is-invalid @enderror" 
                        id="inputName" 
                        placeholder="First Name">
                    @error('fname')
                        <div class="form-text text-red-700">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label class="form-label block"><strong>Last Name:</strong></label>
                    <input 
                        type="text" 
                        name="lname" 
                        class="border px-2 rounded-lg @error('lname') is-invalid @enderror" 
                        id="inputName" 
                        placeholder="Last Name">
                    @error('lname')
                        <div class="form-text text-red-700">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                <label class="form-label block"><strong>Program:</strong></label>
                <div class="grid grid-cols-2">
                    @foreach($programs as $item)
                    <div>
                    <input class="accent-black" type="radio" name="std_prg_id" value="{{ $item->id }}">
                    {{ $item->program_th }}
                </div>
                    @endforeach
                </div>
                @error('std_prg_id')
                    <div class="form-text text-red-700">{{ $message }}</div>
                @enderror
            </div>
    
                <button type="submit" class="border rounded-lg px-2"><i class="fa-solid fa-floppy-disk"></i> Submit</button>
            </form>

    </div>
</div>  

@endsection