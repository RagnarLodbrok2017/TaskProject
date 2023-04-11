<?php

namespace Modules\Album\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AlbumRequest extends FormRequest
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
                Rule::unique('albums','name')->ignore($this->id),
                'min:1', "max:30",
            ],
            'description' => [
                'nullable', "max:1000",
            ],
            'status'=> 'nullable'
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
