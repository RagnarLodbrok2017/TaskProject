<?php

namespace Modules\Album\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Album extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'status','created_by'];
    protected $table = 'albums';


    protected static function newFactory()
    {
        return \Modules\Album\Database\factories\AlbumFactory::new();
    }
}
