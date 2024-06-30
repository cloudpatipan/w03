@extends('layouts.app')

@section('title')
    Vaccine Record Edit
@endsection

@section('content')
    <div class="card mt-5 w-[80%] mx-auto">
        <h2 class="card-header text-center font-semibold">vaccine record Create</h2>
        <div class="card-body">

            @if (session('success'))
                <div class="alert alert-success" role="alert">{{ session('success') }}</div>
            @endif

            <button class="border rounded-lg px-2">
                <a href="{{ route('vaccine-record.index') }}"><i class="fa fa-plus"></i> back</a>
            </button>

            <form class="my-4" action="{{ route('vaccine-record.update', $vaccine_record->id) }}" method="POST">
                @csrf

                
                <div class="mb-3">
                    <label class="form-label block"><strong>Student:</strong></label>
                    <select name="std_id" class="border rounded-lg">
                        <option disabled selected>-- เลือกนักเรียน --</option>
                        @foreach ($students as $student)                       
                        <option value="{{ $student->id }} {{ ($studen->id == $vaccine_record->std_id) ? 'selected' : '' }}">{{ $student->fname . ' ' . $student->lname }}</option>
                        @endforeach
                    </select>
                    @error('std_id')
                        <div class="form-text text-red-700">{{ $message }}</div>
                    @enderror
                </div>
                
                <div class="mb-3">
                    <label class="form-label block"><strong>Vaccine:</strong></label>
                    <div class="grid grid-cols-2">
                        @foreach ($vaccines as $vaccine)
                            <div>
                                <input class="accent-black" type="radio" name="vac_id" value="{{ $vaccine->id }}">
                                {{ $vaccine->vaccine }}
                            </div>
                        @endforeach
                    </div>
                    @error('vac_id')
                        <div class="form-text text-red-700">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-3">
                    <label class="form-label block"><strong>Vaccine Date:</strong></label>
                    <input type="date" name="vaccined_date"
                        class="border px-2 rounded-lg @error('vaccined_date') is-invalid @enderror" id="inputName"
                        placeholder="Last Name">
                    @error('vaccined_date')
                        <div class="form-text text-red-700">{{ $message }}</div>
                    @enderror
                </div>

                <button type="submit" class="border rounded-lg px-2"><i class="fa-solid fa-floppy-disk"></i>
                    Submit</button>
            </form>

        </div>
    </div>
@endsection
