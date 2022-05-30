<?php

namespace App\Http\Requests\TargetVersion;

use Illuminate\Foundation\Http\FormRequest;

class TargetVersionStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string',
            'status' => 'required',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'project_id' => 'required|integer',
        ];
    }
}
