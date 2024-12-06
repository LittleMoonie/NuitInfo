<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleEnum extends Model
{
    use HasFactory;
    // Définir explicitement le nom de la table
    protected $table = 'role_enum';

    protected $fillable = ['role'];

    public function users()
    {
        return $this->hasMany(User::class, 'role');
    }
}
