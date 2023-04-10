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
        return Album::findOrFail($data['id'])->update($data);
    }
    public function delete($id)
    {
        $this->getById($id)->delete();
        return true;
    }

}
