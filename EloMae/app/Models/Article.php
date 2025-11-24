<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
     protected $fillable = [
        'title',
        'subtitle',
        'summary',
        'content',   
        'author_id',
        'tags',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
