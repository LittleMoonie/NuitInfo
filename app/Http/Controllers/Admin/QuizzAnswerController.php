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

    // Retourne un formulaire pour créer un rôle
    public function create()
    {
        // Bien que ce soit un formulaire de création, retourner un message JSON si nécessaire
        return response()->json(['message' => 'Page de création des rôles'], 200);
    }

    // Enregistrer un nouveau rôle dans la base de données
    public function store(Request $request)
    {
        // Validation des données de la requête
        $validated = $request->validate([
            'role' => 'required|string|max:255|unique:role_enum,role',
        ]);

        // Création du rôle dans la base de données
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
        return response()->json($roleEnum);  // Retourne les données du rôle sous forme de JSON
    }

    // Met à jour un rôle existant
    public function update(Request $request, RoleEnum $roleEnum)
    {
        // Validation des données
        $validated = $request->validate([
            'role' => 'required|string|max:255|unique:role_enum,role,' . $roleEnum->id,
        ]);

        // Mise à jour du rôle
        $roleEnum->update($validated);

        // Retourne une réponse JSON avec le message de succès et les nouvelles données du rôle
        return response()->json([
            'message' => 'Rôle mis à jour avec succès.',
            'role' => $roleEnum
        ]);
    }

    // Supprime un rôle
    public function destroy(RoleEnum $roleEnum)
    {
        // Supprimer le rôle
        $roleEnum->delete();

        // Retourne une réponse JSON avec un message de succès
        return response()->json([
            'message' => 'Rôle supprimé avec succès.'
        ]);
    }
}
