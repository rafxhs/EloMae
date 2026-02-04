<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\InstitutionsController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ArticleFavoriteController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\FaqController;

/*
|--------------------------------------------------------------------------
| Página inicial
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'        => Route::has('login'),
        'canRegister'     => Route::has('register'),
        'laravelVersion'  => Application::VERSION,
        'phpVersion'      => PHP_VERSION,
    ]);
})->name('home');

/*
|--------------------------------------------------------------------------
| Autenticação (Google)
|--------------------------------------------------------------------------
*/
Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle'])
    ->name('google.login');

Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

/*
|--------------------------------------------------------------------------
| Rotas públicas (mapa / instituições)
|--------------------------------------------------------------------------
*/
Route::get('/mapa', fn () => Inertia::render('Map/Index'))
    ->name('mapa');

Route::get('/institutions/{institution}', [InstitutionsController::class, 'show'])
    ->name('institutions.show');

/*
|--------------------------------------------------------------------------
| API pública simples (sem auth)
|--------------------------------------------------------------------------
*/
Route::apiResource('locais', InstitutionsController::class);

/*
|--------------------------------------------------------------------------
| Rotas autenticadas (WEB / Inertia)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    /*
    |------------------------------------
    | Dashboard
    |------------------------------------
    */
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    /*
    |------------------------------------
    | Comunidades
    |------------------------------------
    */
    Route::resource('communities', CommunityController::class);

    Route::get('/chat', fn () => Inertia::render('Community/Chat'))
        ->name('communities.chat');

    Route::post('/communities/{community}/join', [CommunityController::class, 'join'])
        ->name('communities.join');

    Route::post('/communities/{community}/leave', [CommunityController::class, 'leave'])
        ->name('communities.leave');

    /*
    |------------------------------------
    | Mensagens (chat)
    |------------------------------------
    */
    Route::get('/messages', [MessageController::class, 'index'])
        ->name('messages.index');

    Route::post('/messages', [MessageController::class, 'store'])
        ->name('messages.store');

    /*
    |------------------------------------
    | Perfil
    |------------------------------------
    */
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

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

    /*
    |--------------------------------------------------------------------------
    | Notificações (WEB, sessão)
    |--------------------------------------------------------------------------
    */
    Route::get('/notifications', fn () => Inertia::render('Notifications/Index'))
        ->name('notifications.index');

    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::get('/notifications/data', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
});


Route::get('/faq', [FaqController::class, 'index'])->name('faq.index');


/*
|--------------------------------------------------------------------------
| Categorias
|--------------------------------------------------------------------------
*/
Route::resource('categories', CategoryController::class);

/*
|--------------------------------------------------------------------------
| Rotas de autenticação padrão
|--------------------------------------------------------------------------
*/
require __DIR__ . '/auth.php';
