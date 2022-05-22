<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IssueHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
        'issue_id',
        'updated_user_id'
    ];


    public function detailHistories()
    {
        return $this->hasMany(IssueHistoryDetail::class);
    }

    public function updatedUser()
    {
        return $this->belongsTo(User::class, 'updated_user_id');
    }
}
