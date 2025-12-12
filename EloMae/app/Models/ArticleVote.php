<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ArticleVote extends Model
{
    protected $fillable = [
        'article_id',
        'user_id',
        'value',
    ];
  
    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

