<?php

namespace App\Http\Requests\Issue;

use Illuminate\Foundation\Http\FormRequest;

class IssueStoreRequest extends FormRequest
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
            'name' => 'required|string|unique:issues,name',
            'project_id' => 'integer',
            'type' => 'integer',
            'start_date' => 'nullable|date',
            'due_date' => 'nullable|date',
            'estimate_time' => 'nullable|integer',
            'tracker_id' => 'required|integer',
            'target_version_id' => 'nullable|integer',
            'issue_status_id' => 'required|integer'
        ];
    }
}
