<?php

namespace Modules\Album\Repositories;

use Modules\Album\Entities\Album;

class AlbumRepository
{
    public function getAll()
    {
        return Album::all();
    }
    public function getFirst()
    {
        return Album::first();
    }
    public function getById($id)
    {
        return Album::findOrFail($id);
    }
    public function store($data)
    {
        return Album::create($data);
    }
    public function update($data)
    {
        $album = Album::find($data['id'])->update($data);
        return $album;
    }
    public function delete($id)
    {
        $this->getById($id)->delete();
        return true;
    }

}
