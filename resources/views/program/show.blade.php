@extends('layouts.app')

@section('title')
    Program Show
@endsection

@section('content')

<div class="card mt-5 w-[80%] mx-auto">
    <h2 class="card-header text-center font-semibold">Program Show<h2>
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
                        <strong>Program TH:</strong> <br/>
                        {{ $program->program_th }}
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 mt-2">
                    <div class="form-group">
                        <strong>Program EN:</strong> <br/>
                        {{ $program->program_en }}
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 mt-2">
                    <div class="form-group">
                        <strong>Grade Year:</strong> <br/>
                        {{ $program->grad_year }}
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 mt-2">
                    <div class="form-group">
                        <strong>Faculty TH:</strong> <br/>
                        {{ $program->faculty->faculty_th }}
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12 mt-2">
                    <div class="form-group">
                        <strong>Faculty EN:</strong> <br/>
                        {{ $program->faculty->faculty_en }}
                    </div>
                </div>

            </div>    

    </div>
</div>  

@endsection