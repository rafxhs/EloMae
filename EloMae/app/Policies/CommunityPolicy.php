<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Community;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommunityPolicy
{
    use HandlesAuthorization;

    public function viewAny(?User $user)
    {
        // qualquer usuário autenticado (ou permitir público com null)
        return true;
    }

    public function view(?User $user, Community $community)
    {
        return true;
    }

    public function create(User $user)
    {
        // apenas admin pode criar
        return (bool) ($user->is_admin === true || $user->is_admin === 'true' || $user->is_admin == 1);
    }

    public function update(User $user, Community $community)
    {
        // aqui: somente admin pode atualizar
        return (bool) ($user->is_admin === true || $user->is_admin === 'true' || $user->is_admin == 1);
    }

    public function delete(User $user, Community $community)
    {
        // somente admin pode deletar
        return (bool) ($user->is_admin === true || $user->is_admin === 'true' || $user->is_admin == 1);
    }

    public function restore(User $user, Community $community)
    {
        return false;
    }

    public function forceDelete(User $user, Community $community)
    {
        return false;
    }
}

