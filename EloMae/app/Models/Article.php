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
        'category_id',

    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function favorites()
    {
        return $this->hasMany(ArticleFavorite::class);
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'article_favorites');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function votes()
    {
        return $this->hasMany(ArticleVote::class);
    }

    public function developmentPhase()
{
    return $this->belongsTo(DevelopmentPhase::class);
}


}
