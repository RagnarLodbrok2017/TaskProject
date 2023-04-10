<?php

namespace Modules\MediaManager\Repositories;

use Illuminate\Support\Facades\DB;
use Modules\MediaManager\Entities\MediaManager;

class MediaManagerRepository
{
    public function getAll()
    {
        return MediaManager::all();
    }
    public function getFirst()
    {
        return MediaManager::first();
    }
    public function getById($id)
    {
        return MediaManager::findOrFail($id);
    }
    public function store($data)
    {
        return MediaManager::create($data);
    }
    public function update($data)
    {
        return MediaManager::findOrFail($data['id'])->update($data);
    }
    public function delete($id)
    {
        $this->getById($id)->delete();
        return true;
    }

}
