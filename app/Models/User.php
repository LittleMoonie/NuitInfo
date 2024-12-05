<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;


class User extends Model // are Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'prenom',
        'email',
        'password',
        'birthday',
        'email',
        'role',
        'isdeleted',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
     public function quizzes()
        {
            return $this->hasMany(Quiz::class, 'user_creation');
        }

        public function playedQuizzes()
        {
            return $this->hasMany(QuizPlayed::class, 'user_id');
        }

        public function leaderboard()
        {
            return $this->hasOne(Leaderboard::class, 'user_id');
        }

        public function role()
        {
            return $this->belongsTo(RoleEnum::class, 'role');
        }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
