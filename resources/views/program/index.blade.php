@extends('layouts.app')

@section('title')
    Program
@endsection

@section('content')
    <div >
        <h2 class="card-header text-center font-semibold">Program</h2>
        <div class="card-body">

            @if (session('success'))
                <div class="border p-4 rounded-lg mt-4" role="alert">{{ session('success') }}</div>
            @endif

            <button class="border rounded-lg p-4 mt-4">
                <a href="{{ route('program.create') }}"><i class="fa fa-plus"></i> Create New item</a>
            </button>

            <div class="rounded-lg border my-4 p-4">
                <table class="w-full">
                    <thead>
                        <tr class="text-left">
                            <th class="border-b">No</th>
                            <th class="border-b">Program TH</th>
                            <th class="border-b">Program EN</th>
                            <th class="border-b">Grade Year</th>
                            <th class="border-b">Faculty TH</th>
                            <th class="border-b">Faculty EN</th>
                            <th class="border-b">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        @forelse ($programs as $item)
                            <tr>
                                <td class="border-b">{{ $item->id }}</td>
                                <td class="border-b">{{ $item->program_th }}</td>
                                <td class="border-b">{{ $item->program_en }}</td>
                                <td class="border-b">{{ $item->grad_year }}</td>
                                <td class="border-b">{{ $item->faculty->faculty_th }}</td>
                                <td class="border-b">{{ $item->faculty->faculty_en }}</td>
                                <td class="border-b">
                                    <form action="{{ route('program.destroy', $item->id) }}" method="POST">
                                        <a class="border rounded-lg px-2" href="{{ route('program.show', $item->id) }}"><i
                                                class="fa-solid fa-list"></i> Show</a>
                                        <a class="border rounded-lg px-2" href="{{ route('program.edit', $item->id) }}"><i
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

            {!! $programs->links() !!}

        </div>
    </div>
@endsection
