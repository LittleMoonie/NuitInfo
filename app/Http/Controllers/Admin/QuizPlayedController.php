<?php

namespace App\Http\Controllers\Admin;

use App\Models\QuizPlayed;
use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;

class QuizPlayedController
{
    // Retourne la liste des parties jouées au format JSON
    public function index()
    {
        $quizPlayed = QuizPlayed::with(['quiz', 'user'])->paginate(10);
        return response()->json($quizPlayed);  // Retourne les parties jouées avec leurs quiz et utilisateurs associés
    }

    // Retourne les informations nécessaires pour créer une nouvelle partie jouée (quizzes et utilisateurs)
    public function create()
    {
        $quizzes = Quiz::all();
        $users = User::all();
        return response()->json([
            'quizzes' => $quizzes,
            'users' => $users
        ]);
    }

    // Enregistre une nouvelle partie jouée dans la base de données
    public function store(Request $request)
    {
        $validated = $request->validate([
            'quiz_id' => 'required|exists:quiz,id',
            'user_id' => 'required|exists:users,id',
            'score' => 'required|integer|min:0',
        ]);

        $quizPlayed = QuizPlayed::create($validated);

        return response()->json([
            'message' => 'Partie jouée ajoutée avec succès.',
            'quizPlayed' => $quizPlayed
        ], 201);  // 201 signifie "créé avec succès"
    }

    // Retourne les informations nécessaires pour éditer une partie jouée
    public function edit(QuizPlayed $quizPlayed)
    {
        $quizzes = Quiz::all();
        $users = User::all();
        return response()->json([
            'quizPlayed' => $quizPlayed,
            'quizzes' => $quizzes,
            'users' => $users
        ]);
    }

    // Met à jour une partie jouée existante
    public function update(Request $request, QuizPlayed $quizPlayed)
    {
        $validated = $request->validate([
            'quiz_id' => 'required|exists:quiz,id',
            'user_id' => 'required|exists:users,id',
            'score' => 'required|integer|min:0',
        ]);

        $quizPlayed->update($validated);

        return response()->json([
            'message' => 'Partie jouée mise à jour avec succès.',
            'quizPlayed' => $quizPlayed
        ]);
    }

    // Supprime une partie jouée
    public function destroy(QuizPlayed $quizPlayed)
    {
        $quizPlayed->delete();

        return response()->json([
            'message' => 'Partie jouée supprimée avec succès.'
        ]);
    }
}
