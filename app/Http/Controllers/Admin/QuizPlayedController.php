<?php

namespace App\Http\Controllers\Admin;

use App\Models\QuizPlayed;
use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;

class QuizPlayedController
{
    public function index()
    {
        $quizPlayed = QuizPlayed::with(['quiz', 'user'])->paginate(10);
        return view('admin.quiz_played.index', compact('quizPlayed'));
    }

    public function create()
    {
        $quizzes = Quiz::all();
        $users = User::all();
        return view('admin.quiz_played.create', compact('quizzes', 'users'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'quiz_id' => 'required|exists:quiz,id',
            'user_id' => 'required|exists:users,id',
            'score' => 'required|integer|min:0',
        ]);

        QuizPlayed::create($validated);
        return redirect()->route('admin.quiz-played.index')->with('success', 'Partie jouée ajoutée avec succès.');
    }

    public function edit(QuizPlayed $quizPlayed)
    {
        $quizzes = Quiz::all();
        $users = User::all();
        return view('admin.quiz_played.edit', compact('quizPlayed', 'quizzes', 'users'));
    }

    public function update(Request $request, QuizPlayed $quizPlayed)
    {
        $validated = $request->validate([
            'quiz_id' => 'required|exists:quiz,id',
            'user_id' => 'required|exists:users,id',
            'score' => 'required|integer|min:0',
        ]);

        $quizPlayed->update($validated);
        return redirect()->route('admin.quiz-played.index')->with('success', 'Partie jouée mise à jour avec succès.');
    }

    public function destroy(QuizPlayed $quizPlayed)
    {
        $quizPlayed->delete();
        return redirect()->route('admin.quiz-played.index')->with('success', 'Partie jouée supprimée avec succès.');
    }
}
