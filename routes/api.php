<?php

use App\Http\Controllers\Admin\Quiz\QuizController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('admin/quiz-manager')->group(function () {
    Route::get('/', [QuizController::class, 'index'])->name('quiz.index');
    Route::post('/create', [QuizController::class, 'create'])->name('quiz.create');
    Route::delete('/delete/{quiz}', [QuizController::class, 'delete'])->name('quiz.delete');
});
