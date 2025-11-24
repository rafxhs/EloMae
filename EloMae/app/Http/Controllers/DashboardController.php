<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'needsCompletion' => $needsCompletion,
        ]);
    }
}