<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

use App\Http\Controllers\InstitutionsController;

Route::get('/institutions', [InstitutionsController::class, 'index']);
