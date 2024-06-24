@extends('layouts.app')

@section('title')
    Vaccine
@endsection

@section('content')
    <div class="card mt-5 w-[80%] mx-auto">
        <h2 class="card-header text-center font-semibold">Vaccine Edit</h2>
        <div class="card-body">

            @if (session('success'))
                <div class="alert alert-success" role="alert">{{ session('success') }}</div>
            @endif

            <button class="border rounded-lg p-4 mt-4">
                <a href="{{ route('vaccine.create') }}"><i class="fa fa-plus"></i> Create New item</a>
            </button>

            <div class="rounded-lg border my-4 p-4">
                <table class="w-full">
                    <thead>
                        <tr class="text-left">
                            <th class="border-b">No</th>
                            <th class="border-b">Vaccine</th>
                            <th class="border-b">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        @forelse ($vaccines as $item)
                            <tr>
                                <td class="border-b">{{ $item->id }}</td>
                                <td class="border-b">{{ $item->vaccine }}</td>
                                <td class="border-b">
                                    <form action="{{ route('vaccine.destroy', $item->id) }}" method="POST">
                                        <a class="border rounded-lg px-2" href="{{ route('vaccine.show', $item->id) }}"><i
                                                class="fa-solid fa-list"></i> Show</a>
                                        <a class="border rounded-lg px-2" href="{{ route('vaccine.edit', $item->id) }}"><i
                                                class="fa-solid fa-pen-to-square"></i> Edit</a>
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="border rounded-lg px-2"><i
                                                class="fa-solid fa-trash"></i> Delete</button>
                                    </form>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="4">ไม่มีข้อมูล</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            {!! $vaccines->links() !!}

        </div>
    </div>
@endsection
