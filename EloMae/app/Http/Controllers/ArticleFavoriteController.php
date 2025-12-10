<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleFavorite;
use Illuminate\Http\Request;

class ArticleFavoriteController extends Controller
{
    public function toggle(Request $request, Article $article)
    {
        $user = $request->user();

        $favorite = ArticleFavorite::where('user_id', $user->id)
            ->where('article_id', $article->id)
            ->first();

        if ($favorite) {
            $favorite->delete();
            $favorited = false;
        } else {
            ArticleFavorite::create([
                'user_id' => $user->id,
                'article_id' => $article->id,
            ]);
            $favorited = true;
        }

        return response()->json([
            'favorited' => $favorited,
            'favorites_count' => $article->favorites()->count(),
        ]);
    }
}
