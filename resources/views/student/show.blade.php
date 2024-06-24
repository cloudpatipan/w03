@extends('layouts.app')

@section('title')
    Student Show
@endsection

@section('content')

<div class="card mt-5 w-[80%] mx-auto">
    <h2 class="card-header text-center font-semibold">Student Show</h2>
    <div class="card-body">
        
        @if(session('success'))
            <div class="alert alert-success" role="alert">{{ session('success') }}</div>
        @endif

            <button class="border rounded-lg px-2 mt-4">
                <a href="{{ route('program.index') }}"><i class="fa fa-plus"></i> Back</a>
            </button>

            <div class="mt-4 border rounded-lg p-4">
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Student Identification ID:</strong> <br/>
                        {{ $student->sid }}
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 mt-2">
                    <div class="form-group">
                        <strong>First Name:</strong> <br/>
                        {{ $student->fname }}
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 mt-2">
                    <div class="form-group">
                        <strong>First Name:</strong> <br/>
                        {{ $student->lname }}
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 mt-2">
                    <div class="form-group">
                        <strong class="mb-4">Program:</strong><br/>
                        <label class="block font-semibold">- Program TH</label>
                        <p>{{ $student->program->program_th }}</p>
                        <label class="block font-semibold">- Program EN</label>
                        {{ $student->program->program_en }}
                    </div>
                </div>

            </div>    

    </div>
</div>  

@endsection