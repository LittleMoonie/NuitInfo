<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = ['title', 'description', 'user_creation', 'point', 'isvalidated'];

    public function questions()
    {
        return $this->hasMany(QuizQuestion::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_creation');
    }
}
