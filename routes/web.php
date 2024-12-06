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

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('users', [UserController::class, 'index']);
//     Route::update('users', [UserController::class, 'update']);
    Route::delete('users', [UserController::class, 'destroy']);
    Route::get('users/create', [UserController::class, 'create']);
    Route::post('users', [UserController::class, 'store']);
    Route::get('quizzes', [QuizController::class, 'index']);
//     Route::update('quizzes', [QuizController::class, 'update']);
    Route::delete('quizzes', [QuizController::class, 'destroy']);
    Route::get('quizzes/create', [QuizController::class, 'create']);
    Route::post('quizzes', [QuizController::class, 'store']);
    Route::get('roles', [RoleEnumController::class, 'index']);
//     Route::update('roles', [RoleEnumController::class, 'update']);
    Route::delete('roles', [RoleEnumController::class, 'destroy']);
    Route::get('roles/create', [RoleEnumController::class, 'create']);
    Route::post('roles', [RoleEnumController::class, 'store']);
    Route::get('answers', [QuizzAnswerController::class, 'index']);
    // Route::put('answers', [QuizzAnswerController::class, 'update']);  // Mise à jour laissée en commentaire
    Route::delete('answers', [QuizzAnswerController::class, 'destroy']);
    Route::get('answers/create', [QuizzAnswerController::class, 'create']);
    Route::post('answers', [QuizzAnswerController::class, 'store']);
    Route::get('quiz-played', [QuizPlayedController::class, 'index']);
    // Route::put('quiz-played', [QuizPlayedController::class, 'update']);  // Mise à jour laissée en commentaire
    Route::delete('quiz-played', [QuizPlayedController::class, 'destroy']);
    Route::get('quiz-played/create', [QuizPlayedController::class, 'create']);
    Route::post('quiz-played', [QuizPlayedController::class, 'store']);
//     Route::get('leaderboards', [LeaderboardController::class, 'index']);
//     // Route::put('leaderboards', [LeaderboardController::class, 'update']);  // Mise à jour laissée en commentaire
//     Route::delete('leaderboards', [LeaderboardController::class, 'destroy']);
//     Route::get('leaderboards/create', [LeaderboardController::class, 'create']);
//     Route::post('leaderboards', [LeaderboardController::class, 'store']);
});

Route::prefix('admin/leaderboard')->group(function () {
    Route::get('/', [LeaderboardController::class, 'index']);
    Route::post('/', [LeaderboardController::class, 'store']);
    Route::put('/{id}', [LeaderboardController::class, 'update']);
    Route::delete('/{id}', [LeaderboardController::class, 'destroy']);
});

require __DIR__.'/auth.php';


