<?php

namespace App\Http\Controllers\Admin;

use App\Models\RoleEnum;
use Illuminate\Http\Request;

class RoleEnumController
{
    // Retourne la liste des rôles sous forme de JSON
    public function index()
    {
        $roles = RoleEnum::paginate(10);
        return response()->json($roles);  // Retourne les rôles au format JSON
    }

    // Retourne un formulaire pour créer un rôle (ici, on ne l'utilise pas, mais on peut retourner un message JSON si nécessaire)
    public function create()
    {
        return response()->json(['message' => 'Page de création des rôles'], 200); // Juste un exemple de message JSON
    }

    // Enregistrer un nouveau rôle dans la base de données
    public function store(Request $request)
    {
        $validated = $request->validate([
            'role' => 'required|string|max:255|unique:role_enum,role',
        ]);

        $role = RoleEnum::create($validated);

        // Retourne une réponse JSON avec le rôle créé
        return response()->json([
            'message' => 'Rôle créé avec succès.',
            'role' => $role
        ], 201);  // 201 signifie "créé avec succès"
    }

    // Retourne le rôle à éditer (en JSON)
    public function edit(RoleEnum $roleEnum)
    {
        return response()->json($roleEnum);
    }

    // Met à jour un rôle existant
    public function update(Request $request, RoleEnum $roleEnum)
    {
        $validated = $request->validate([
            'role' => 'required|string|max:255|unique:role_enum,role,' . $roleEnum->id,
        ]);

        $roleEnum->update($validated);

        return response()->json([
            'message' => 'Rôle mis à jour avec succès.',
            'role' => $roleEnum
        ]);
    }

    // Supprime un rôle
    public function destroy(RoleEnum $roleEnum)
    {
        $roleEnum->delete();

        return response()->json([
            'message' => 'Rôle supprimé avec succès.'
        ]);
    }
}
