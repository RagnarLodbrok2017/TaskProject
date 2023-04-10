<?php

namespace Modules\MediaManager\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class File extends Model
{
    use HasFactory;

    protected $table = 'files';
    protected $fillable = [
        'name',
        'type',
        'url',
        'status',
        'created_by'
    ];
    protected static function newFactory()
    {
        return \Modules\MediaManager\Database\factories\FileFactory::new();
    }
}
