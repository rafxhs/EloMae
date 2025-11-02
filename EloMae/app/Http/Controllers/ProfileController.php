<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Mostrar o formulário de edição do perfil (Inertia)
     */
public function edit(Request $request)
{
    $user = $request->user()->load('address', 'dependents');

    $mustVerifyEmail = method_exists($user, 'hasVerifiedEmail') && !$user->hasVerifiedEmail();
    $status = session('status');

    // Verifica se o perfil está completo 
    $needsCompletion = empty($user->birth_date)
        || $user->children_count === null
        || !$user->address
        || empty($user->address->street)
        || empty($user->address->city)
        || empty($user->address->state)
        || empty($user->address->zip);

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

    return Inertia::render('Profile/Edit', [
        'mustVerifyEmail' => $mustVerifyEmail,
        'status' => $status,
        'auth' => [
            'user' => $user,
        ],
        'needsCompletion' => $needsCompletion,
    ]);
}


    /**
     * Atualizar perfil e endereço (PATCH /profile)
     */
    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'birth_date' => ['nullable', 'date', 'before:today'],
            'children_count' => ['required', 'integer', 'min:0', 'max:20'],
            'government_beneficiary' => ['sometimes', 'boolean'],

            // campos aninhados address.*
            'address.street' => ['nullable', 'string', 'max:255'],
            'address.neighborhood' => ['nullable', 'string', 'max:255'],
            'address.city' => ['nullable', 'string', 'max:255'],
            'address.state' => ['nullable', 'string', 'max:255'],
            'address.zip' => ['nullable', 'string', 'max:30'],
        ]);

        // Atualizar usuário
        $user->fill([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'birth_date' => $validated['birth_date'] ?? null,
            'children_count' => $validated['children_count'] ?? 0,
            'government_beneficiary' => isset($validated['government_beneficiary']) ? (bool)$validated['government_beneficiary'] : false,
        ]);
        $user->save();

        // Tratar endereço
        $addressData = $validated['address'] ?? [];
        // remover valores vazios
        $addressData = array_filter($addressData, function ($v) {
            return $v !== null && $v !== '';
        });

        if (!empty($addressData)) {
            $user->address()->updateOrCreate(
                ['user_id' => $user->id],
                $addressData
            );
        }


        // Atualizar dependentes
        $dependents = $request->input('dependents', []);

        // Limpar dependentes antigos e recriar todos
        $user->dependents()->delete();

        foreach ($dependents as $dependent) {
            if (!empty($dependent['name'])) {
                $user->dependents()->create([
                    'name' => $dependent['name'],
                    'birth_date' => $dependent['birth_date'] ?? null,
                    'gender' => $dependent['gender'] ?? null,
                ]);
            }
        }

        return back(303)->with('status', 'profile-updated');
    }
}
