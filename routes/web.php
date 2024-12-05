<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\QuizController;
use App\Http\Controllers\Admin\RoleEnumController;
use App\Http\Controllers\Admin\QuizzAnswerController;
use App\Http\Controllers\Admin\QuizPlayedController;
use App\Http\Controllers\Admin\LeaderboardController;

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
        'auth' => [
            'user' => [
                'name' => auth()->user()->name,
                'score' => 85, // Example score
            ],
        ],
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('quizzes', QuizController::class);
    Route::resource('roles', RoleEnumController::class);
    Route::resource('answers', QuizzAnswerController::class);
    Route::resource('quiz-played', QuizPlayedController::class);
    Route::resource('leaderboards', LeaderboardController::class);
});
