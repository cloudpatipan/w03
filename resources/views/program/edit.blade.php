@extends('layouts.app')

@section('title')
    Program Edit
@endsection

@section('content')

<div >
    <h2 class="card-header text-center font-semibold">Program Edit</h2>
    <div class="card-body">
        
        @if(session('success'))
            <div class="alert alert-success" role="alert">{{ session('success') }}</div>
        @endif

        <button class="border rounded-lg px-2">
            <a href="{{ route('program.index') }}"><i class="fa fa-plus"></i> back</a>
        </button>


            <form class="my-4" action="{{ route('program.update', $program->id) }}" method="POST">
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label class="form-label block"><strong>Program TH:</strong></label>
                    <input 
                        type="text" 
                        name="program_th" 
                        class="border px-2 rounded-lg @error('program_th') is-invalid @enderror" 
                        id="inputName" 
                        placeholder="Program TH"
                        value="{{ $program->program_th }}"
                        >
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
                        placeholder="Program EN"
                        value="{{ $program->program_en }}"
                        >
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
                        placeholder="Grad Year"
                        value="{{ $program->grad_year }}"
                        >
                    @error('grad_year')
                        <div class="form-text text-red-700">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                <label class="form-label block"><strong>Faculty:</strong></label>
                <div class="grid grid-cols-2">
                    @foreach($faculties as $item)
                    <div>
                    <input class="accent-black" type="radio" name="prg_fac_id" value="{{ $item->id }}" {{ ($item->id == $program->prg_fac_id)  ? 'checked' : ''}}>
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
