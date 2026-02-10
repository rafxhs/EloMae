<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleFavorite;
use Illuminate\Http\Request;

class ArticleFavoriteController extends Controller
{
    public function toggle(Request $request, Article $article)
    {
        // Usuária autenticada
        $user = $request->user();

        // Busca favorito existente
        $favorite = ArticleFavorite::where('user_id', $user->id)
            ->where('article_id', $article->id)
            ->first();

        // Remove ou cria favorito
        if ($favorite) {
            $favorite->delete();
        } else {
            ArticleFavorite::create([
                'user_id'    => $user->id,
                'article_id' => $article->id,
            ]);
        }

        // Retorno compatível com Inertia
        return back();
    }
}
