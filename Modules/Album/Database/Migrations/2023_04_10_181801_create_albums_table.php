<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Modules\Album\Entities\Album;

class CreateAlbumsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('albums', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191)->unique();
            $table->text('description')->nullable();
            $table->boolean('status')->nullable()->default(true);

            $table->boolean('created_by')->nullable();

            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null');
            $table->timestamps();
        });

        $albums = [
            [1, 'Cars', 'Cars Description'],
            [2, 'Laptops', 'Laptops Description'],
            [3, 'TVs', 'TVs Description'],
        ];
        foreach ($albums as $album)
        {
            $newAlbum = new Album();
            $newAlbum->name = $album[0];
            $newAlbum->description = $album[1];
            $newAlbum->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('albums');
    }
}
