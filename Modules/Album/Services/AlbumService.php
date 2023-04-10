<?php

namespace Modules\Album\Services;

use Exception;
use Illuminate\Support\Facades\DB;
use Modules\Album\Repositories\AlbumRepository;

class AlbumService
{
    private $fileRepository;

    public function __construct(AlbumRepository $fileRepository)
    {
        $this->albumRepository = $fileRepository;
    }

    public function getAll()
    {
        return $this->albumRepository->getAll();
    }
    public function getFirst()
    {
        return $this->albumRepository->getFirst();
    }
    public function getById($id)
    {
        return $this->albumRepository->getById($id);
    }
    public function store($data)
    {
        DB::beginTransaction();
        try {
            $data = $this->albumRepository->store($data);
            DB::commit();
            return $data;
        }
        catch (Exception $ex)
        {
            DB::rollBack();
            return false;
        }
    }
    public function update($data)
    {
        DB::beginTransaction();
        try {
            $data = $this->albumRepository->update($data);
            DB::commit();
            return $data;
        }
        catch (Exception $ex)
        {
            DB::rollBack();
            return false;
        }
    }
    public function delete($id)
    {
        if ($id){
            DB::beginTransaction();
            try {
                $this->albumRepository->delete($id);
                DB::commit();
                return true;
            }
            catch (Exception $ex){
                DB::rollBack();
                var_dump($ex->getMessage());
                return false;
            }
        }
    }

}
