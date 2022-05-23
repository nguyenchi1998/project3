<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelativeIssue extends Model
{
    use HasFactory;

    protected $fillable = [
        'relative_issue_id',
        'issue_id',
    ];

    public function issue()
    {
        return $this->belongsTo(Issue::class, 'relative_issue_id');
    }
}
