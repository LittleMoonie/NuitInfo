<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'user_creation', 'point', 'isvalidated'];

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_creation');
    }

    public function answers()
    {
        return $this->hasMany(QuizzAnswer::class);
    }

}
