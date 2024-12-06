<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\Api\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard/', function () {
return Inertia::render('Dashboard', [
        'facts' => [
            'The ocean produces over 50% of the world’s oxygen.',
            'Human lungs function similarly to coral reefs in filtering and supporting life.',
            'Over 70% of the Earth’s surface is covered by oceans, akin to the human body being mostly water.',
        ],
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/forum/', function(){
    return Inertia::render('Forum');
})->middleware(['auth', 'verified'])->name('forum');

Route::get('/users/', function(){
    return Inertia::render('Admin/Users');
})->middleware(['auth', 'verified'])->name('users');

Route::get('/quizzes', function(){
    return Inertia::render('Admin/Quizzes');
})->middleware(['auth', 'verified'])->name('quizzes');

Route::get('/posts', function(){
    return Inertia::render('Admin/Posts');
})->middleware(['auth', 'verified'])->name('posts');

Route::get('/leaderboard', function(){
    return Inertia::render('Admin/Leaderboard');
})->middleware(['auth', 'verified'])->name('leaderboard');

Route::get('/about/', function () {
    return Inertia::render('About/About');
});

Route::get('/parallels/', function () {
    return Inertia::render('Parallels/Parallels');
});

Route::get('/about/', function () {
    return Inertia::render('About/About');
});

Route::get('/explore/', function () {
    return Inertia::render('Explore/Explore');
});

Route::get('/resources/', function () {
    return Inertia::render('Resources/Resources');
});

Route::get('/contact/', function () {
    return Inertia::render('Contact/Contact');
});

Route::get('/signin/', function () {
    return Inertia::render('Auth/SignIn');
});

Route::get('/share', function () {
    return Inertia::render('Share/Share');
});

Route::get('/act', function () {
    return Inertia::render('Act/Act');
});

Route::get('/support', function () {
    return Inertia::render('SupportUs/SupportUs');
});

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy/PrivacyPolicy');
});

Route::get('/terms-of-use', function () {
    return Inertia::render('TermsOfUse/TermsOfUse');
});

Route::get('/confidentiality', function () {
    return Inertia::render('Confidentiality/Confidentiality');
});

Route::get('/donation', function () {
    return Inertia::render('Donation/Donation');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('posts')->group(function () {
    // Route pour récupérer tous les posts
    Route::get('/', [PostController::class, 'index']);

    // Route pour créer un nouveau post
    Route::post('/', [PostController::class, 'store']);

    // Route pour récupérer un post spécifique
    Route::get('{id}', [PostController::class, 'show']);

    // Route pour mettre à jour un post existant
    Route::put('{id}', [PostController::class, 'update']);

    // Route pour supprimer un post
    Route::delete('{id}', [PostController::class, 'destroy']);
});

require __DIR__.'/auth.php';
