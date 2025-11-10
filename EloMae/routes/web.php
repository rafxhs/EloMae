<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Models\Institutions;
use App\Http\Controllers\InstitutionsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\GoogleController;
use Inertia\Inertia;
use App\Http\Controllers\CommunityController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth:sanctum')->group(function () {
    // operações que precisam de auth já no controller - aqui deixamos criar/editar/excluir via auth
    Route::apiResource('communities', CommunityController::class)
        ->except(['index', 'show']);
});
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Dashboard (onde vai aparecer o "Completar Cadastro")

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Route::get('communities', [CommunityController::class, 'index'])->name('communities');
    // Route::get('communities/{community}', [CommunityController::class, 'show'])->name('communities.show') ;

    Route::resource('communities', CommunityController::class);

    Route::get('/chat', function () {
        return Inertia::render('Community/Chat');
    })->name('communities.chat');

    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
Route::post('/messages', [MessageController::class, 'store'])->name('messages.store');

    //Route::get('/communities/{community}/chat', [CommunityController::class, 'chat'])->name('communities.chat');

    // Perfil (Editar e Atualizar)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/mapa', function () {
    return Inertia::render('Map/Index');
})->name('mapa');

Route::apiResource('locais', InstitutionsController::class);

Route::get('/auth/google', [GoogleController::class, 'redirectToGoogle'])->name('google.login');
Route::get('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

require __DIR__ . '/auth.php';
