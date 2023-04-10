@extends('mediamanager::layouts.master')

@section('content')
    <div id="app">
        <router-view>

        </router-view>
    </div>
    <h1>Hello World</h1>

    <script src="{{mix(('modules/js/mediamanager.js'))}}"></script>
@endsection
