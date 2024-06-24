@extends('layouts.app')

@section('title')
    Vaccine Record Show
@endsection

@section('content')

<div class="card mt-5 w-[80%] mx-auto">
    <h2 class="card-header text-center font-semibold">Vaccine Record Show</h2>
    <div class="card-body">
        
        @if(session('success'))
            <div class="alert alert-success" role="alert">{{ session('success') }}</div>
        @endif

            <button class="border rounded-lg px-2 mt-4">
                <a href="{{ route('vaccine-record.index') }}"><i class="fa fa-plus"></i> Back</a>
            </button>

            <div class="mt-4 border rounded-lg p-4">
                
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>First Name:</strong> <br/>
                        {{ $vaccine_record->student->fname }}
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>First Name:</strong> <br/>
                        {{ $vaccine_record->student->lname }}
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Vaccine:</strong> <br/>
                        {{ $vaccine_record->vaccine->vaccine }}
                    </div>
                </div>

                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Vaccine Date:</strong> <br/>
                        {{ $vaccine_record->vaccined_date }}
                    </div>
                </div>
                
            </div>    

    </div>
</div>  

@endsection