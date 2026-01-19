<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Institutions extends Model
{
    protected $fillable = [
        'name',
        'type',
        'address',
        'lat',
        'lng',
        'phone',
        'photo',
        'opening_hours',
        'services',
    ];

    public function getPhotoUrlAttribute()
    {
        return $this->photo
            ? asset('storage/' . $this->photo)
            : null;
    }
}


