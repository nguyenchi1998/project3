<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IssueHistoryDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'old_value',
        'new_value',
        'issue_history_id',
    ];
}
