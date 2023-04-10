<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;

Route::prefix('album')->group(function() {
    Route::get('/', 'AlbumController@index');
});


Route::prefix('/dashboard')->group(function (){

    Route::any('/albums/{any?}',function (){
        return view('album::index');
    })->where(['any' => '.*']);

});
