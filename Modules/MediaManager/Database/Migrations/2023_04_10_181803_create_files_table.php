<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('name', 191)->unique();
            $table->string('type', 191)->nullable();
            $table->text('url')->nullable();
            $table->boolean('status')->nullable()->default(true);

            $table->unsignedBigInteger('album_id')->nullable();
            $table->unsignedBigInteger('uploaded_by')->nullable();

            $table->foreign('uploaded_by')->references('id')->on('users')->onDelete('set null');
            $table->foreign('uploaded_by')->references('id')->on('albums')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
}
