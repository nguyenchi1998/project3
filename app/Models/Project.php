<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'priority',
        'start_date',
        'due_date',
        'status',
        'source_control',
        'type'
    ];

    public function members()
    {
        return $this->belongsToMany(User::class)
            ->withPivot(['role', 'effort'])
            ->withTimestamps();
    }

    public function languages()
    {
        return $this->belongsToMany(Language::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function issues()
    {
        return $this->hasMany(Issue::class);
    }

    public function targetVersions()
    {
        return $this->hasMany(TargetVersion::class);
    }
}
