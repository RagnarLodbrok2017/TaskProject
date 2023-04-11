<?php

namespace Modules\MediaManager\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FileRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => [
                Rule::unique('files','name')->ignore($this->id),
                'max:120'
            ],
            'url' => [
                'nullable',
            ],
            'status' => 'nullable',
            'album_id' => 'nullable',
            'uploaded_by' => 'nullable',

        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}
