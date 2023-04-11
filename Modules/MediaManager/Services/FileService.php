<?php

namespace Modules\MediaManager\Services;

use App\Traits\FileTraits;
use Exception;
use Illuminate\Support\Facades\DB;
use Modules\MediaManager\Entities\File;
use Modules\MediaManager\Repositories\FileRepository;

class FileService
{
    private $fileRepository;
    use FileTraits;

    public function __construct(FileRepository $fileRepository)
    {
        $this->fileRepository = $fileRepository;
    }

    public function getAll()
    {
        return $this->fileRepository->getAll();
    }
    public function getAllForUser()
    {
        if (auth()->user()->id)
        {
            return $this->fileRepository->getAllForUser(auth()->user()->id);
        }
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
        if ($data['file'])
        {
                $result = $this->saveFile('uploads/images', $data['file']);
                $newFile['url'] = $result[0];
                $newFile['type'] = $result[1];
                $newFile['name'] = $result[2];
                $newFile['status'] = true;
                $newFile['album_id'] = $data['album_id'];
                $newFile['uploaded_by'] = $data['uploaded_by'];
                DB::beginTransaction();
                try {
                    $data = $this->fileRepository->store($newFile);
                    DB::commit();
                    return $data;
                }
                catch (Exception $ex)
                {
                    DB::rollBack();
                    return false;
                }

            }
    }

    public function updateCollection($data)
    {
        DB::beginTransaction();
        try {
            DB::commit();
            $files = File::where('album_id', $data['id'])->update(['album_id' => $data['new_album_id']]);
            return true;
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
            $result = $this->fileRepository->update($data);
            DB::commit();
            if ($result){
                $file = $this->getById($data['id']);
                return $file;
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
            $file_path = $this->getById($id)->url;
            $this->deleteFile($file_path);
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
