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
        'due_date',
        'estimate_time',
        'actual_time',
        'progress_percent',
        'status',
        'target_version_id',
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

    public function parentIssue()
    {
        return $this->belongsTo(Issue::class, 'parent_issue_id');
    }

    public function subIssues()
    {
        return $this->hasMany(Issue::class, 'parent_issue_id');
    }

    public function relativeIssues()
    {
        return $this->hasMany(RelativeIssue::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function targetVersion()
    {
        return $this->belongsTo(TargetVersion::class);
    }

    public function lastHistory()
    {
        return $this->hasOne(IssueHistory::class)
            ->latestOfMany();
    }
}
