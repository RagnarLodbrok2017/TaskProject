<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <head>

        <meta charset="utf-8" />
        <title>Dashboard | Elnakieb - Admin & Dashboard Template</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
        <meta content="Themesdesign" name="author" />
        <!-- App favicon -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="shortcut icon" href="{{asset('assets/images/favicon.ico')}}">
        <!-- Scripts -->
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <!-- Bootstrap Css -->
        <link href="{{asset('assets/css/bootstrap.min.css')}}" id="bootstrap-style" rel="stylesheet" type="text/css" />
        <!-- Icons Css -->
        <link href="{{asset('assets/css/icons.min.css')}}" rel="stylesheet" type="text/css" />
        <!-- App Css-->
        <link href="{{asset('assets/css/app.min.css')}}" id="app-style" rel="stylesheet" type="text/css" />
    </head>
</head>
<body data-topbar="dark">
<script>
    var base_url = "{{ getBaseUrl() }}";
    {{--var csrf_token = {{ getCsrfToken() }};--}}
</script>
<!-- Begin page -->
<div id="layout-wrapper">


    <header id="page-topbar">
        <div class="navbar-header">
            <div class="d-flex">
                <!-- LOGO -->
                <div class="navbar-brand-box">
                    <a href="./dashboard" class="logo logo-dark">
                                <span class="logo-sm">
                                    <img src="{{asset('assets/images/logo-sm.png')}}" alt="logo-sm" height="22">
                                </span>
                        <span class="logo-lg">
                                    <img src="{{asset('assets/images/logo-dark.png')}}" alt="logo-dark" height="20">
                                </span>
                    </a>

                    <a href="./dashboard" class="logo logo-light">
                                <span class="logo-sm">
                                    <img src="{{asset('assets/images/logo-dark.png')}}" alt="logo-sm-light" height="22">
                                </span>
                        <span class="logo-lg">
                                    <img src="{{asset('assets/images/logo-light.png')}}" alt="logo-light" height="20">
                                </span>
                    </a>
                </div>

                <button type="button" class="btn btn-sm px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn">
                    <i class="ri-menu-2-line align-middle"></i>
                </button>

                <!-- App Search-->
                <form class="app-search d-none d-lg-block">
                    <div class="position-relative">
                        <input type="text" class="form-control" placeholder="Search...">
                        <span class="ri-search-line"></span>
                    </div>
                </form>

            </div>

            <div class="d-flex">

                <div class="dropdown d-inline-block d-lg-none ms-2">
                    <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-search-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="ri-search-line"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                         aria-labelledby="page-header-search-dropdown">

                        <form class="p-3">
                            <div class="mb-3 m-0">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search ...">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="submit"><i class="ri-search-line"></i></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="dropdown d-none d-lg-inline-block ms-1">
                    <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
                        <i class="ri-fullscreen-line"></i>
                    </button>
                </div>

                <div class="dropdown d-inline-block">
                    <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown"
                            data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="ri-notification-3-line"></i>
                        <span class="noti-dot"></span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                         aria-labelledby="page-header-notifications-dropdown">
                        <div class="p-3">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h6 class="m-0"> Notifications </h6>
                                </div>
                                <div class="col-auto">
                                    <a href="#!" class="small"> View All</a>
                                </div>
                            </div>
                        </div>
                        <div data-simplebar style="max-height: 230px;">
                            <a href="" class="text-reset notification-item">
                                <div class="d-flex">
                                    <div class="avatar-xs me-3">
                                                <span class="avatar-title bg-primary rounded-circle font-size-16">
                                                    <i class="ri-shopping-cart-line"></i>
                                                </span>
                                    </div>
                                    <div class="flex-1">
                                        <h6 class="mb-1">Your order is placed</h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1">If several languages coalesce the grammar</p>
                                            <p class="mb-0"><i class="mdi mdi-clock-outline"></i> 3 min ago</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="" class="text-reset notification-item">
                                <div class="d-flex">
                                    <img src="{{asset('assets/images/users/avatar-1.jpg')}}"
                                         class="me-3 rounded-circle avatar-xs" alt="user-pic">
                                    <div class="flex-1">
                                        @auth()
                                            <h6 class="mb-1">{{auth()->user()->name}}</h6>
                                        @elseauth()
                                            <h6 class="mb-1">Ahmed Elnakieb</h6>
                                        @endauth
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1">It will seem like simplified English.</p>
                                            <p class="mb-0"><i class="mdi mdi-clock-outline"></i> 1 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="" class="text-reset notification-item">
                                <div class="d-flex">
                                    <img src="{{asset('assets/images/users/avatar-1.jpg')}}"
                                         class="me-3 rounded-circle avatar-xs" alt="user-pic">
                                    <div class="flex-1">
                                        <h6 class="mb-1">Ahmed elnakieb</h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1">As a skeptical Cambridge friend of mine occidental.</p>
                                            <p class="mb-0"><i class="mdi mdi-clock-outline"></i> 1 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="p-2 border-top">
                            <div class="d-grid">
                                <a class="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                                    <i class="mdi mdi-arrow-right-circle me-1"></i> View More..
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dropdown d-inline-block user-dropdown">
                    <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="rounded-circle header-profile-user" src="{{asset('assets/images/users/avatar-1.jpg')}}"
                             alt="Header Avatar">
                        @auth()
                            <span class="d-none d-xl-inline-block ms-1">{{auth()->user()->name}}</span>
                        @elseauth()
                            <span class="d-none d-xl-inline-block ms-1">Ahmed</span>
                        @endauth
                        <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end">
                        <!-- item-->
                        <a class="dropdown-item" href="#"><i class="ri-user-line align-middle me-1"></i> Profile</a>
                        <a class="dropdown-item d-block" href="#"><span class="badge bg-success float-end mt-1">11</span><i class="ri-settings-2-line align-middle me-1"></i> Settings</a>
                        <a class="dropdown-item" href="#"><i class="ri-lock-unlock-line align-middle me-1"></i> Lock screen</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item text-danger" onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();"><i class="ri-shut-down-line align-middle me-1 text-danger"></i> Logout
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                @csrf
                            </form></a>
                    </div>
                </div>

                <div class="dropdown d-inline-block">
                    <button type="button" class="btn header-item noti-icon right-bar-toggle waves-effect">
                        <i class="ri-settings-2-line"></i>
                    </button>
                </div>

            </div>
        </div>
    </header>

    <!-- ========== Left Sidebar Start ========== -->
    <div class="vertical-menu">

        <div data-simplebar class="h-100">

            <!-- User details -->
            <div class="user-profile text-center mt-3">
                <div class="">
                    <img src="{{asset('assets/images/users/avatar-1.jpg')}}" alt="" class="avatar-md rounded-circle">
                </div>
                <div class="mt-3">
                    @auth()
                        <h4 class="font-size-16 mb-1">{{auth()->user()->name }}</h4>
                    @elseauth()
                        <h4 class="font-size-16 mb-1">Ahmed Elnakieb</h4>
                    @endauth
                    <span class="text-muted"><i class="ri-record-circle-line align-middle font-size-14 text-success"></i> Online</span>
                </div>
            </div>

            <!--- Sidemenu -->
            <div id="sidebar-menu">
                <!-- Left Menu Start -->
                <ul class="metismenu list-unstyled" id="side-menu">
                    <li class="menu-title">Menu</li>

                    <li>
                        <a href="./dashboard" class="waves-effect">
                            <i class="ri-dashboard-line"></i><span class="badge rounded-pill bg-success float-end">3</span>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript: void(0);" class=" waves-effect">
                            <i class="ri-calendar-2-line"></i>
                            <span>Users</span>
                        </a>
                    </li>
                    <li>
                        <a href="./dashboard/albums" class=" waves-effect">
                            <i class="ri-calendar-2-line"></i>
                            <span>Albums</span>
                        </a>
                    </li>

                    <li>
                        <a href="./dashboard/files" class="has-arrow waves-effect">
                            <i class="ri-mail-send-line"></i>
                            <span>Media</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">
                            <li><a href="javascript: void(0);">All</a></li>
                        </ul>
                    </li>

                    <li>
                        <a onclick="event.preventDefault();
                      document.getElementById('logout-form').submit();" class="has-arrow waves-effect">
                            <i class="ri-share-line"></i>
                            <span>Logout</span>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                        </a>
                    </li>

                </ul>
            </div>
            <!-- Sidebar -->
        </div>
    </div>
    <!-- Left Sidebar End -->

    <main>
        <div class="main-content">
            <div class="page-content">
                <div class="container-fluid">
                @yield('content')
                </div>
            </div>

            <footer class="footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6">
                            <script>document.write(new Date().getFullYear())</script> © Elnakieb.
                        </div>
                        <div class="col-sm-6">
                            <div class="text-sm-end d-none d-sm-block">
                                Crafted with <i class="mdi mdi-heart text-danger"></i> by Elnakieb
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

        @yield('script')
    </main>

</div>
<!-- END layout-wrapper -->

<!-- App js -->
<script src="{{asset('assets/js/jquery.min.js')}}"></script>
<script src="{{asset('assets/js/app.js')}}"></script>

</body>
</html>
