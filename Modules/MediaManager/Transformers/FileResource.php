<?php

namespace Modules\MediaManager\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class FileResource extends JsonResource
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
            'album_id' => $this->album_id,
            'name' => $this->name,
            'status' => (bool)$this->status,
            'type' => $this->type,
            'uploaded_by' => $this->uploaded_by,
            'url' => $this->url = url('').'/'.$this->url ?? null,
            'created_at' => $this->created_at->format('Y-m-d'),
            'updated_at' => $this->updated_at->format('Y-m-d'),
            'album_name' => $this->album->name,
        ];
    }
}
