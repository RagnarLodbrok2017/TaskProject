<?php

namespace Modules\MediaManager\Services;

use Exception;
use Illuminate\Support\Facades\DB;
use Modules\MediaManager\Entities\File;
use Modules\MediaManager\Repositories\FileRepository;

class FileService
{
    private $fileRepository;

    public function __construct(FileRepository $fileRepository)
    {
        $this->fileRepository = $fileRepository;
    }

    public function getAll()
    {
        return $this->fileRepository->getAll();
    }
    public function getFirst()
    {
        return $this->fileRepository->getFirst();
    }
    public function getById($id)
    {
        return $this->fileRepository->getById($id);
    }
    public function store($data)
    {
        DB::beginTransaction();
        try {
            $data = $this->fileRepository->store($data);
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
            $data = $this->fileRepository->update($data);
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
                $this->fileRepository->delete($id);
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
