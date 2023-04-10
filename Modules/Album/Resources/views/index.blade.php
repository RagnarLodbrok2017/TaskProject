@extends('album::layouts.master')

@section('content')
    <h2> index of albums </h2>
    <div id="app">
        <router-view>

        </router-view>
    </div>

    <script src="{{mix('modules/js/album.js')}}"></script>

@endsection
