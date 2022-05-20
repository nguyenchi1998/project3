<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'project_id',
        'description',
        'priority',
        'assign_user_id',
        'created_user_id',
        'parent_task_id',
        'start_date',
        'end_date',
        'estimate_time',
        'actual_time',
        'progress_percent',
        'status',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'created_user_id');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assign_user_id');
    }
}
