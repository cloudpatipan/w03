@extends('layouts.app')

@section('title')
    Student
@endsection

@section('content')
    <div >
        <h2 class="card-header text-center font-semibold">Student</h2>
        <div class="card-body">

            @if (session('success'))
                <div class="border p-4 rounded-lg mt-4" role="alert">{{ session('success') }}</div>
            @endif

            <button class="border rounded-lg p-4 mt-4">
                <a href="{{ route('student.create') }}"><i class="fa fa-plus"></i> Create New item</a>
            </button>

            <div class="rounded-lg border my-4 p-4">
                <table class="w-full">
                    <thead>
                        <tr class="text-left">
                            <th class="border-b">No</th>
                            <th class="border-b">SID</th>
                            <th class="border-b">First name</th>
                            <th class="border-b">Last name</th>
                            <th class="border-b">Grade Year</th>
                            <th class="border-b">Program TH</th>
                            <th class="border-b">Program EN</th>
                            <th class="border-b">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        @forelse ($students as $item)
                            <tr>
                                <td class="border-b">{{ $item->id }}</td>
                                <td class="border-b">{{ $item->sid }}</td>
                                <td class="border-b">{{ $item->fname }}</td>
                                <td class="border-b">{{ $item->lname }}</td>
                                <td class="border-b">{{ $item->program->grad_year }}</td>
                                <td class="border-b">{{ $item->program->program_th }}</td>
                                <td class="border-b">{{ $item->program->program_en }}</td>
                                <td class="border-b">
                                    <form action="{{ route('student.destroy', $item->id) }}" method="POST">
                                        <a class="border rounded-lg px-2" href="{{ route('student.show', $item->id) }}"><i
                                                class="fa-solid fa-list"></i> Show</a>
                                        <a class="border rounded-lg px-2" href="{{ route('student.edit', $item->id) }}"><i
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

            {!! $students->links() !!}

        </div>
    </div>
@endsection
