<?php

namespace App\Http\Controllers\Admin;

use App\Models\RoleEnum;
use Illuminate\Http\Request;

class RoleEnumController
{
    public function index()
    {
        $roles = RoleEnum::paginate(10);
        return view('admin.roles.index', compact('roles'));
    }

    public function create()
    {
        return view('admin.roles.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'role' => 'required|string|max:255|unique:role_enum,role',
        ]);

        RoleEnum::create($validated);
        return redirect()->route('admin.roles.index')->with('success', 'Rôle créé avec succès.');
    }

    public function edit(RoleEnum $roleEnum)
    {
        return view('admin.roles.edit', compact('roleEnum'));
    }

    public function update(Request $request, RoleEnum $roleEnum)
    {
        $validated = $request->validate([
            'role' => 'required|string|max:255|unique:role_enum,role,' . $roleEnum->id,
        ]);

        $roleEnum->update($validated);
        return redirect()->route('admin.roles.index')->with('success', 'Rôle mis à jour avec succès.');
    }

    public function destroy(RoleEnum $roleEnum)
    {
        $roleEnum->delete();
        return redirect()->route('admin.roles.index')->with('success', 'Rôle supprimé avec succès.');
    }
}
