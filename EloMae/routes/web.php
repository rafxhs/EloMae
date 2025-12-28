<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\InstitutionsController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleFavoriteController;
use App\Http\Controllers\CategoryController;

/*
|--------------------------------------------------------------------------
| Página inicial
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'      => Route::has('login'),
        'canRegister'   => Route::has('register'),
        'laravelVersion'=> Application::VERSION,
        'phpVersion'    => PHP_VERSION,
    ]);
})->name('home');

/*
|--------------------------------------------------------------------------
| Autenticação + Rotas públicas
|--------------------------------------------------------------------------
*/
Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle'])->name('google.login');
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::get('/mapa', fn () => Inertia::render('Map/Index'))->name('mapa');

/*
|--------------------------------------------------------------------------
| Rotas públicas da API
|--------------------------------------------------------------------------
*/
Route::apiResource('locais', InstitutionsController::class);

/*
|--------------------------------------------------------------------------
| Rotas protegidas por auth:sanctum (geralmente API)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    
    Route::apiResource('communities', CommunityController::class)
        ->except(['index', 'show']);
});

/*
|--------------------------------------------------------------------------
| Rotas autenticadas (web)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    /*
    |------------------------------------
    | Comunidades
    |------------------------------------
    */
    Route::resource('communities', CommunityController::class);

    Route::get('/chat', fn () => Inertia::render('Community/Chat'))
        ->name('communities.chat');

    Route::post('/communities/{community}/join',  [CommunityController::class, 'join'])
        ->name('communities.join');

    Route::post('/communities/{community}/leave', [CommunityController::class, 'leave'])
        ->name('communities.leave');

    /*
    |------------------------------------
    | Mensagens (chat)
    |------------------------------------
    */
    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');

    /*
    |------------------------------------
    | Perfil
    |------------------------------------
    */
    Route::get('/profile',  [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile',[ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile',[ProfileController::class, 'destroy'])->name('profile.destroy');

    /*
    |------------------------------------
    | Artigos
    |------------------------------------
    */
    Route::resource('articles', ArticleController::class);

    Route::post('/articles/{article}/favorite', [ArticleFavoriteController::class, 'toggle'])
        ->name('articles.favorite');

    Route::post('/articles/{article}/vote', [ArticleController::class, 'vote'])
        ->name('articles.vote');
});

/*
|--------------------------------------------------------------------------
| Categorias
|--------------------------------------------------------------------------
*/
Route::resource('categories', CategoryController::class);


require __DIR__ . '/auth.php';
