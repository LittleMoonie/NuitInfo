<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    protected $fillable = ['quiz_id', 'question_text', 'points'];

    public function answers()
    {
        return $this->hasMany(QuizAnswer::class, 'question_id');
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}
