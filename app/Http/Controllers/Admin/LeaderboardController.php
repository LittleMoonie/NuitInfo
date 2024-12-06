<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Leaderboard;

class LeaderboardController extends Controller
{
    public function index()
    {
        // Eager load user data for the leaderboard
        $leaderboard = Leaderboard::with('user')->get();

        // Map to add `user_name` combining `nom` and `prenom`
        $leaderboard = $leaderboard->map(function ($entry) {
            $entry->user_name = $entry->user
                ? "{$entry->user->nom} {$entry->user->prenom}"
                : 'Unknown User';
            unset($entry->user); // Optional: remove user object
            return $entry;
        });

        return response()->json($leaderboard);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'total_score' => 'required|integer|min:0',
        ]);

        $leaderboard = Leaderboard::create([
            'user_id' => $request->user_id,
            'total_score' => $request->total_score,
        ]);

        return response()->json($leaderboard, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'total_score' => 'required|integer|min:0',
        ]);

        $leaderboard = Leaderboard::findOrFail($id);
        $leaderboard->update([
            'user_id' => $request->user_id,
            'total_score' => $request->total_score,
        ]);

        return response()->json($leaderboard);
    }

    public function destroy($id)
    {
        $leaderboard = Leaderboard::findOrFail($id);
        $leaderboard->delete();

        return response()->json(['message' => 'Leaderboard entry deleted successfully.']);
    }
}
