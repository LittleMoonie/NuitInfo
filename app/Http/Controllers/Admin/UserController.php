<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\RoleEnum;
use Illuminate\Http\Request;

class UserController
{
    // 1. Lister les utilisateurs
    public function index()
    {
        $users = User::with('role')->paginate(10); // Pagination avec la relation role
        return view('admin.users.index', compact('users'));
    }

    // 2. Afficher le formulaire de création
    public function create()
    {
        $roles = RoleEnum::all(); // Liste des rôles
        return view('admin.users.create', compact('roles'));
    }

    // 3. Enregistrer un nouvel utilisateur
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|exists:role_enum,id',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = bcrypt($validated['password']); // Hacher le mot de passe

        User::create($validated);

        return redirect()->route('admin.users.index')->with('success', 'Utilisateur créé avec succès.');
    }

    // 4. Afficher un utilisateur spécifique
    public function show(User $user)
    {
        return view('admin.users.show', compact('user'));
    }

    // 5. Afficher le formulaire de modification
    public function edit(User $user)
    {
        $roles = RoleEnum::all();
        return view('admin.users.edit', compact('user', 'roles'));
    }

    // 6. Mettre à jour un utilisateur
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|exists:role_enum,id',
        ]);

        $user->update($validated);

        return redirect()->route('admin.users.index')->with('success', 'Utilisateur mis à jour avec succès.');
    }

    // 7. Supprimer un utilisateur
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'Utilisateur supprimé avec succès.');
    }
}
