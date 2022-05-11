<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public function members()
    {
        return $this->belongsToMany(User::class)->withPivot('role');
    }

    public function languages()
    {
        return $this->belongsToMany(Language::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

}
