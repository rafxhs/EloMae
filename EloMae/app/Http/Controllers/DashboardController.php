<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\ArticleView;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user()->load('address', 'dependents');

        // Verificação de completude do perfil 
        $needsCompletion = empty($user->birth_date)
            || $user->children_count === null
            || !$user->address
            || empty($user->address->street)
            || empty($user->address->city)
            || empty($user->address->state)
            || empty($user->address->zip);

        // Se a contagem de filhos for > 0, verificar dependentes
        if (!$needsCompletion) {
            $childrenCount = (int) ($user->children_count ?? 0);
            if ($childrenCount > 0) {
                if ($user->dependents->count() < $childrenCount) {
                    $needsCompletion = true;
                } else {
                    foreach ($user->dependents as $dep) {
                        if (empty($dep->name) || empty($dep->birth_date)) {
                            $needsCompletion = true;
                            break;
                        }
                    }
                }
            }
        }

        $communities = $user->communities()->get();

        $favoriteArticles = $user->favoriteArticles()
            ->with('author', 'category')
            ->get();

        $recentArticles = $user->recentlyReadArticles()->get(['id', 'title', 'summary']);

        $popularArticles = Article::withCount('views')
            ->orderByDesc('views_count')
            ->limit(5)
            ->get(['id', 'title']);

        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'needsCompletion' => $needsCompletion,
            'communities' => $communities,
            'favoriteArticles' => $favoriteArticles,
            'recentArticles' => $recentArticles,
            'popularArticles' => $popularArticles,
        ]);
    }
}
