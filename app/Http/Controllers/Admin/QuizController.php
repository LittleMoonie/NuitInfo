<?php

namespace App\Http\Controllers\Admin;

use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;

class QuizController
{
    public function index()
    {
        $quizzes = Quiz::with('creator')->paginate(10);
        return view('admin.quizzes.index', compact('quizzes'));
    }

    public function create()
    {
        $users = User::all();
        return view('admin.quizzes.create', compact('users'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'user_creation' => 'required|exists:users,id',
            'point' => 'required|integer|min:0',
        ]);

        Quiz::create($validated);
        return redirect()->route('admin.quizzes.index')->with('success', 'Quiz créé avec succès.');
    }

    public function edit(Quiz $quiz)
    {
        $users = User::all();
        return view('admin.quizzes.edit', compact('quiz', 'users'));
    }

    public function update(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'user_creation' => 'required|exists:users,id',
            'point' => 'required|integer|min:0',
        ]);

        $quiz->update($validated);
        return redirect()->route('admin.quizzes.index')->with('success', 'Quiz mis à jour avec succès.');
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();
        return redirect()->route('admin.quizzes.index')->with('success', 'Quiz supprimé avec succès.');
    }
}
