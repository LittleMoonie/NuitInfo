<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizzAnswer extends Model
{
    use HasFactory;

    protected $fillable = ['quizz_id', 'description', 'is_response'];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class, 'quizz_id');
    }
}
