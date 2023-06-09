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

//Route::prefix('mediamanager')->group(function() {
//    Route::get('/', 'MediaManagerController@index');
//});
Route::middleware('auth:sanctum')->group(function (){
    Route::prefix('/dashboard')->group(function (){

        Route::any('/files/{any?}',function (){
            return view('mediamanager::index');
        })->where(['any' => '.*']);

    });
});


