<?php

namespace Modules\Album\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\MediaManager\Entities\File;

class Album extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'status','created_by'];
    protected $table = 'albums';

    public function files (){
        return $this->hasMany(File::class, 'album_id', 'id');
    }

    protected $appends = [
        'has_images'
    ];
    protected $casts = [
        'status' => 'boolean'
    ];
    public function getHasImagesAttribute(){
        return $this->files()->exists();
    }



    protected static function newFactory()
    {
        return \Modules\Album\Database\factories\AlbumFactory::new();
    }
}
