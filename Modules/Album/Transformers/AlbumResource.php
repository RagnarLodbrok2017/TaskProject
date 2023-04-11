<?php

namespace Modules\Album\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\MediaManager\Transformers\FileResource;

class AlbumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
//        return parent::toArray($request);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'status' => (bool) $this->status,
            'images_count' => $this->images_count,
            'has_images' => $this->has_images,
            'description' => $this->description,
            'created_by' => $this->created_by,
            'created_at' => $this->created_at->format('Y-m-d'),
            'updated_at' => $this->updated_at->format('Y-m-d'),
            'images' => FileResource::collection($this->files),
        ];
    }
}
