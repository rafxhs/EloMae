<?php

namespace App\Policies;

use App\Models\Article;
use App\Models\User;

class ArticlePolicy
{

    public function create(User $user): bool
    {
        // apenas administradores podem criar
        return $user->is_admin;
    }

    public function update(User $user, Article $article): bool
    {
        // apenas administradores podem editar
        return $user->is_admin;
    }

    public function delete(User $user, Article $article): bool
    {
        // apenas administradores podem deletar
        return $user->is_admin;
    }
}
