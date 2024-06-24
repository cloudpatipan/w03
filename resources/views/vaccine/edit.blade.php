@extends('layouts.app')

@section('title')
    Vaccine Edit
@endsection

@section('content')

<div class="card mt-5 w-[80%] mx-auto">
    <h2 class="card-header text-center font-semibold">Vaccine Edit</h2>
    <div class="card-body">
        
        @if(session('success'))
            <div class="alert alert-success" role="alert">{{ session('success') }}</div>
        @endif

        <button class="border rounded-lg px-2">
            <a href="{{ route('vaccine.index') }}"><i class="fa fa-plus"></i> back</a>
        </button>

            <form class="my-4" action="{{ route('vaccine.update', $vaccine->id) }}" method="POST">
                @csrf
                @method('PUT')
                <div class="mb-3">
                    <label class="form-label block"><strong>Vaccine:</strong></label>
                    <input 
                        type="text" 
                        name="vaccine" 
                        class="border px-2 rounded-lg @error('vaccine') is-invalid @enderror" 
                        id="inputName" 
                        placeholder="vaccine"
                        value="{{ $vaccine->vaccine }}"
                        >
                    @error('vaccine')
                        <div class="form-text text-danger">{{ $message }}</div>
                    @enderror
                </div>
    
                <button type="submit" class="border rounded-lg px-2"><i class="fa-solid fa-floppy-disk"></i> Submit</button>
            </form>

    </div>
</div>  

@endsection