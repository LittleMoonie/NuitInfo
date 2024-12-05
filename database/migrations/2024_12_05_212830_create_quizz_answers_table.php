<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quizz_answer', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('quizz_id');
            $table->tinyText('description');
            $table->boolean('is_response')->default(false);
            $table->timestamps();

            $table->foreign('quizz_id')->references('id')->on('quiz')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizz_answers');
    }
};
