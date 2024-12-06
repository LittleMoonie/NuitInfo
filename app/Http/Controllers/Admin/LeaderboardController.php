<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Leaderboard;
use App\Models\User;

class LeaderboardController extends Controller
{
    /**
     * Display a listing of the leaderboard entries.
     */
    public function index()
    {
        $leaderboard = Leaderboard::all();
        return response()->json($leaderboard);
    }

    /**
     * Store a newly created leaderboard entry in storage.
     */
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

    /**
     * Update the specified leaderboard entry in storage.
     */
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

    /**
     * Remove the specified leaderboard entry from storage.
     */
    public function destroy($id)
    {
        $leaderboard = Leaderboard::findOrFail($id);
        $leaderboard->delete();

        return response()->json(['message' => 'Leaderboard entry deleted successfully.']);
    }
}
