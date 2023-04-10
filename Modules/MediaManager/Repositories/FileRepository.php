<?php

namespace Modules\MediaManager\Repositories;

use Illuminate\Support\Facades\DB;
use Modules\MediaManager\Entities\File;

class FileRepository
{
    public function getAll()
    {
        return File::all();
    }
    public function getFirst()
    {
        return File::first();
    }
    public function getById($id)
    {
        return File::findOrFail($id);
    }
    public function store($data)
    {
        return File::create($data);
    }
    public function update($data)
    {
        return File::findOrFail($data['id'])->update($data);
    }
    public function delete($id)
    {
        $this->getById($id)->delete();
        return true;
    }

}
