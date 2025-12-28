<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ArticleFavorite extends Model
{
    protected $table = 'article_favorites';

    protected $fillable = [
        'user_id',
        'article_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
