@extends('layouts.app')

@section('title')
    Program Create
@endsection

@section('content')

<div class="card mt-5 w-[80%] mx-auto">
    <h2 class="card-header text-center font-semibold">Program Create</h2>
    <div class="card-body">
        
        @if(session('success'))
            <div class="alert alert-success" role="alert">{{ session('success') }}</div>
        @endif

        <button class="border rounded-lg px-2">
            <a href="{{ route('program.index') }}"><i class="fa fa-plus"></i> back</a>
        </button>


            <form class="my-4" action="{{ route('program.store') }}" method="POST">
                @csrf
    
                <div class="mb-3">
                    <label class="form-label block"><strong>Program TH:</strong></label>
                    <input 
                        type="text" 
                        name="program_th" 
                        class="border px-2 rounded-lg @error('program_th') is-invalid @enderror" 
                        id="inputName" 
                        placeholder="Program TH">
                    @error('program_th')
                        <div class="form-text text-red-700">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label class="form-label block"><strong>Program EN:</strong></label>
                    <input 
                        type="text" 
                        name="program_en" 
                        class="border px-2 rounded-lg @error('program_en') is-invalid @enderror" 
                        id="inputName" 
                        placeholder="Program EN">
                    @error('program_en')
                        <div class="form-text text-red-700">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label class="form-label block"><strong>Grad Year:</strong></label>
                    <input 
                        type="number" 
                        name="grad_year" 
                        class="border px-2 rounded-lg @error('grad_year') is-invalid @enderror" 
                        id="inputName" 
                        placeholder="Grad Year">
                    @error('grad_year')
                        <div class="form-text text-red-700">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                <label class="form-label block"><strong>Faculty:</strong></label>
                <div class="grid grid-cols-2">
                    @foreach($facultys as $item)
                    <div>
                    <input class="accent-black" type="radio" name="prg_fac_id" value="{{ $item->id }}">
                    {{ $item->faculty_th }}
                </div>
                    @endforeach
                </div>
                @error('prg_fac_id')
                    <div class="form-text text-red-700">{{ $message }}</div>
                @enderror
            </div>
    
                <button type="submit" class="border rounded-lg px-2"><i class="fa-solid fa-floppy-disk"></i> Submit</button>
            </form>

    </div>
</div>  

@endsection