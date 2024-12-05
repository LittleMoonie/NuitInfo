<?php

namespace App\Http\Controllers\Admin;

use App\Models\QuizzAnswer;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizzAnswerController
{
    public function index()
    {
        $answers = QuizzAnswer::with('quiz')->paginate(10);
        return view('admin.answers.index', compact('answers'));
    }

    public function create()
    {
        $quizzes = Quiz::all();
        return view('admin.answers.create', compact('quizzes'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'quizz_id' => 'required|exists:quiz,id',
            'description' => 'required|string',
            'is_response' => 'required|boolean',
        ]);

        QuizzAnswer::create($validated);
        return redirect()->route('admin.answers.index')->with('success', 'Réponse créée avec succès.');
    }

    public function edit(QuizzAnswer $quizzAnswer)
    {
        $quizzes = Quiz::all();
        return view('admin.answers.edit', compact('quizzAnswer', 'quizzes'));
    }

    public function update(Request $request, QuizzAnswer $quizzAnswer)
    {
        $validated = $request->validate([
            'quizz_id' => 'required|exists:quiz,id',
            'description' => 'required|string',
            'is_response' => 'required|boolean',
        ]);

        $quizzAnswer->update($validated);
        return redirect()->route('admin.answers.index')->with('success', 'Réponse mise à jour avec succès.');
    }

    public function destroy(QuizzAnswer $quizzAnswer)
    {
        $quizzAnswer->delete();
        return redirect()->route('admin.answers.index')->with('success', 'Réponse supprimée avec succès.');
    }
}
