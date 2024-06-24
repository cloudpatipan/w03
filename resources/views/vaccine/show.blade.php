@extends('layouts.app')

@section('title')
    Vaccine
@endsection

@section('content')

<div class="card mt-5 w-[80%] mx-auto">
    <h2 class="card-header text-center font-semibold">Vaccine Show</h2>
    <div class="card-body">
        
        @if(session('success'))
            <div class="alert alert-success" role="alert">{{ session('success') }}</div>
        @endif

            <button class="border rounded-lg px-2 mt-4">
                <a href="{{ route('vaccine.index') }}"><i class="fa fa-plus"></i> Back</a>
            </button>

            <div class="mt-4 border rounded-lg p-4">
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Vaccine:</strong> <br/>
                        {{ $vaccine->vaccine }}
                    </div>
                </div>
            </div>    

    </div>
</div>  

@endsection