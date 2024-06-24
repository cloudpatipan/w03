@extends('layouts.app')

@section('title')
    Faculty Create
@endsection

@section('content')

<div class="card mt-5 w-[80%] mx-auto">
    <h2 class="card-header text-center font-semibold">Faculty Edit</h2>
    <div class="card-body">
        
        @if(session('success'))
            <div class="alert alert-success" role="alert">{{ session('success') }}</div>
        @endif

        <button class="border rounded-lg px-2">
            <a href="{{ route('faculty.index') }}"><i class="fa fa-plus"></i> back</a>
        </button>


        <form class="my-4" action="{{ route('faculty.update', $faculty->id) }}" method="POST" enctype="multipart/form-data">
            @csrf   
            @method('PUT')
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label class="form-label block"><strong>Faculty TH:</strong></label>
                    <input 
                        type="text" 
                        name="faculty_th" 
                        class="border px-2 rounded-lg @error('faculty_th') is-invalid @enderror" 
                        id="inputName" 
                        placeholder="faculty_th"
                        value="{{ $faculty->faculty_th }}"
                        >
                    @error('faculty_th')
                        <div class="form-text text-red-700">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                <label class="form-label block"><strong>Faculty en:</strong></label>
                <input 
                    type="text" 
                    name="faculty_en" 
                    class="border px-2 rounded-lg @error('faculty_en') is-invalid @enderror" 
                    id="inputName" 
                    placeholder="Faculty EN"
                    value="{{ $faculty->faculty_en }}">
                @error('faculty_en')
                    <div class="form-text text-red-700">{{ $message }}</div>
                @enderror
            </div>
    
                <button type="submit" class="border rounded-lg px-2"><i class="fa-solid fa-floppy-disk"></i> Submit</button>
            </form>

    </div>
</div>  

@endsection