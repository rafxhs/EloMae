<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Community;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user()->load([
            'address',
            'dependents',
            'communities'
        ]);

    // Verifica se o perfil do usuário está completo
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

      // Carrega as comunidades da usuária
        $communities = $user->communities()
            ->withCount('users as members_count')
            ->orderBy('communities.created_at', 'desc')
            ->get()
            ->map(function (Community $community) {
                return [
                    'id' => $community->id,
                    'nome' => $community->name,
                    'descricao' => $community->description,
                    'members_count' => $community->members_count,
                    'created_at' => $community->created_at?->toDateTimeString(),
                ];
            });

        return Inertia::render('Dashboard', [
            'auth' => [
                'user' => $user,
            ],
            'needsCompletion' => $needsCompletion,
            'communities' => $communities,
        ]);
    }
}
