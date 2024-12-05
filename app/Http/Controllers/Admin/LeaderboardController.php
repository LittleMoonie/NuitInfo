<?php

namespace App\Http\Controllers\Admin;

use App\Models\Leaderboard;
use App\Models\User;
use Illuminate\Http\Request;

class LeaderboardController
{
    public function index()
    {
        $leaderboards = Leaderboard::with('user')->paginate(10);
        return view('admin.leaderboards.index', compact('leaderboards'));
    }

    public function create()
    {
        $users = User::all();
        return view('admin.leaderboards.create', compact('users'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'total_score' => 'required|integer|min:0',
        ]);

        Leaderboard::create($validated);
        return redirect()->route('admin.leaderboards.index')->with('success', 'Leaderboard ajouté avec succès.');
    }

    public function edit(Leaderboard $leaderboard)
    {
        $users = User::all();
        return view('admin.leaderboards.edit', compact('leaderboard', 'users'));
    }

    public function update(Request $request, Leaderboard $leaderboard)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'total_score' => 'required|integer|min:0',
        ]);

        $leaderboard->update($validated);
        return redirect()->route('admin.leaderboards.index')->with('success', 'Leaderboard mis à jour avec succès.');
    }

    public function destroy(Leaderboard $leaderboard)
    {
        $leaderboard->delete();
        return redirect()->route('admin.leaderboards.index')->with('success', 'Leaderboard supprimé avec succès.');
    }
}
