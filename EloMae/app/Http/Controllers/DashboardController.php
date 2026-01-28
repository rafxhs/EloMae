<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Community;
use App\Models\DependentPhaseNotification;
use App\Models\Article;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user()->load([
            'address',
            'dependents',
            'communities',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Verifica se o perfil do usuário está completo
        |--------------------------------------------------------------------------
        */
        $needsCompletion = empty($user->birth_date)
            || $user->children_count === null
            || ! $user->address
            || empty($user->address->street)
            || empty($user->address->city)
            || empty($user->address->state)
            || empty($user->address->zip);

        if (! $needsCompletion) {
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

        /*
        |--------------------------------------------------------------------------
        | Comunidades da usuária
        |--------------------------------------------------------------------------
        */
        $communities = $user->communities()
            ->withCount('users as members_count')
            ->orderBy('communities.created_at', 'desc')
            ->get()
            ->map(function (Community $community) {
                return [
                    'id'            => $community->id,
                    'nome'          => $community->name,
                    'descricao'     => $community->description,
                    'members_count' => $community->members_count,
                    'created_at'    => $community->created_at?->toDateTimeString(),
                ];
            });

        /*
        |--------------------------------------------------------------------------
        | Artigos Favoritos da Usuária (estrela)
        |--------------------------------------------------------------------------
        */
        $favoriteArticles = $user->favoriteArticles()
            ->latest('article_favorites.created_at')
            ->take(6)
            ->get()
            ->map(function (Article $article) {
                return [
                    'id'      => $article->id,
                    'title'   => $article->title,
                    'summary' => $article->summary,
                ];
            })
            ->values();

        /*
        |--------------------------------------------------------------------------
        | Artigos recomendados com base na última fase notificada
        |--------------------------------------------------------------------------
        */
        $recommendedArticles = [];

        $lastPhaseNotification = DependentPhaseNotification::whereHas('dependent', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
            ->with('developmentPhase.articles')
            ->latest('notified_at')
            ->first();

        if ($lastPhaseNotification && $lastPhaseNotification->developmentPhase) {
            $recommendedArticles = $lastPhaseNotification
                ->developmentPhase
                ->articles
                ->take(6)
                ->map(function ($article) {
                    return [
                        'id'      => $article->id,
                        'title'   => $article->title,
                        'summary' => $article->summary,
                    ];
                })
                ->values();
        }

        /*
        |--------------------------------------------------------------------------
        | Renderização do Dashboard
        |--------------------------------------------------------------------------
        */
        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'needsCompletion'     => $needsCompletion,
            'communities'         => $communities,
            'favoriteArticles'    => $favoriteArticles,
            'recommendedArticles' => $recommendedArticles,
        ]);
    }
}
