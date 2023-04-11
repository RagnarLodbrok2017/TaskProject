<?php

namespace Modules\Album\Services;

use Exception;
use Illuminate\Support\Facades\DB;
use Modules\Album\Repositories\AlbumRepository;
use Modules\MediaManager\Services\FileService;
use function PHPUnit\Framework\isEmpty;

class AlbumService
{
    private $albumRepository;
    private $fileService;

    public function __construct(AlbumRepository $albumRepository, FileService $fileService)
    {
        $this->albumRepository = $albumRepository;
        $this->fileService = $fileService;
    }

    public function getAll()
    {
        return $this->albumRepository->getAll();
    }
    public function getAllForUser()
    {
        if (auth()->user()->id)
        {
            return $this->albumRepository->getAllForUser(auth()->user()->id);
        }
    }
    public function getAllForUserWithEager($eager)
    {
        if (auth()->user()->id)
        {
            return $this->albumRepository->getAllForUserWithEager(auth()->user()->id, $eager);
        }
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
            $result = $this->albumRepository->update($data);
            DB::commit();
            if ($result){
                $album = $this->getById($data['id']);
                return $album;
            }
            return $result;
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
                $album = $this->getById($id);
                if ($album->files != null && $album->files->isNotEmpty()){
                    foreach ($album->files as $file){
                        $this->fileService->delete($file->id);
                    };
                    $album->files->delete();
                }
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
