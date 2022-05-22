<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Issue extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'tracker_id',
        'project_id',
        'description',
        'priority',
        'assign_user_id',
        'created_user_id',
        'parent_issue_id',
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

    public function tracker()
    {
        return $this->belongsTo(Tracker::class);
    }

    public function histories()
    {
        return $this->hasMany(IssueHistory::class)->oldest();
    }
}
