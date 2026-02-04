<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\ArticleFavorite;
use App\Models\ArticleView;
use App\Models\Article;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'birth_date',
        'children_count',
        'government_beneficiary',
        'is_admin',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'government_beneficiary' => 'boolean',
        'birth_date' => 'date',
    ];

    public function address()
    {
        return $this->hasOne(Address::class);
    }

    public function dependents()
    {
        return $this->hasMany(Dependent::class);
    }

    public function communities()
    {
        return $this->belongsToMany(Community::class, 'community_user')
        ->withPivot('last_read_at')
        ->withTimestamps();
    }

    public function articleFavorites()
    {
        return $this->hasMany(ArticleFavorite::class);
    }


    public function articleViews()
    {
        return $this->hasMany(ArticleView::class);
    }

    public function recentlyViewedArticles()
    {
        return $this->belongsToMany(
            Article::class,
            'article_views'
        )
            ->withPivot('read_at')
            ->orderByDesc('article_views.read_at');
    }

    public function favoriteArticles()
    {
        return $this->belongsToMany(
            Article::class,
            'article_favorites',
            'user_id',
            'article_id'
        )->withTimestamps();
    }
    public function recentlyReadArticles()
    {
        return Article::query()
            ->select('articles.*')
            ->join('article_views', 'articles.id', '=', 'article_views.article_id')
            ->where('article_views.user_id', $this->id)
            ->orderByDesc('article_views.read_at')
            ->limit(5);
    }

}
