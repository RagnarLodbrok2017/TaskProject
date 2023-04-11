<?php

namespace App\Traits;

trait FileTraits
{
    public function saveFile($path, $file, $name = null){
        if (!$name)
        {
            $extension = $file->getClientOriginalExtension();
            $fileName = rand().''.time().'.'.$extension;
            $file->move(public_path('uploads/images'), $fileName);
            $url = $path.'/'.$fileName;
            return [$url, $extension, $fileName];
        }
    }
    public function deleteFile($file_path){
        if ($file_path && file_exists($file_path))
        {
            unlink($file_path);
            return true;
        }
    }
}
