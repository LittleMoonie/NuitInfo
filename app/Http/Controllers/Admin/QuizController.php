<?php

namespace App\Http\Controllers\Admin;

use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;

class QuizController
{
    // Retourne la liste des quizzes au format JSON
    public function index()
    {
        $quizzes = Quiz::all();
        return response()->json($quizzes);  // Retourne les quizzes avec leurs créateurs associés
    }

    // Retourne les informations nécessaires pour créer un quiz (utilisateurs)
    public function create()
    {
        $users = User::all();
        return response()->json(['users' => $users]);
    }

    // Enregistre un nouveau quiz dans la base de données
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'user_creation' => 'required|exists:users,id',
            'point' => 'required|integer|min:0',
        ]);

        $quiz = Quiz::create($validated);

        return response()->json([
            'message' => 'Quiz créé avec succès.',
            'quiz' => $quiz
        ], 201);  // 201 signifie "créé avec succès"
    }

    // Retourne les informations nécessaires pour éditer un quiz
    public function edit(Quiz $quiz)
    {
        $users = User::all();
        return response()->json([
            'quiz' => $quiz,
            'users' => $users
        ]);
    }

    // Met à jour un quiz existant
    public function update(Request $request, Quiz $quiz)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'user_creation' => 'required|exists:users,id',
            'point' => 'required|integer|min:0',
        ]);

        $quiz->update($validated);

        return response()->json([
            'message' => 'Quiz mis à jour avec succès.',
            'quiz' => $quiz
        ]);
    }

    // Supprime un quiz
    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        return response()->json([
            'message' => 'Quiz supprimé avec succès.'
        ]);
    }
}
