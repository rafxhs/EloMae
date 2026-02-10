<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        $article = Article::latest()
            ->select('id', 'title', 'summary', 'content')
            ->first();

        return Inertia::render('Welcome', [
            'articlePreview' => $article,
            'canLogin'       => Route::has('login'),
            'canRegister'    => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion'     => PHP_VERSION,
        ]);
    }
}
