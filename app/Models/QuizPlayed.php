<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizPlayed extends Model
{
    use HasFactory;

    protected $fillable = ['quiz_id', 'user_id', 'score'];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class, 'quiz_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
