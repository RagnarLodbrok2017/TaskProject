@extends('dashboard.layouts.app')

@section('content')
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0">Albums</h4>

                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="javascript: void(0);">Dashboard</a></li>
                        <li class="breadcrumb-item active">Albums</li>
                    </ol>
                </div>

            </div>
        </div>
    </div>
    <!-- end page title -->

    <div id="app">
        <router-view>

        </router-view>
    </div>
    <script type="text/javascript" src="{{mix('modules/js/album.js')}}"></script>


@endsection
@section('section')
    <script>
        alert('hi');
    </script>
@endsection
