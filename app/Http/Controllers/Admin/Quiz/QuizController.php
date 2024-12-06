<?php

namespace App\Http\Controllers\Admin\Quiz;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $quiz = Quiz::all();
        return response()->json($quiz, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // Create a new quiz
        $validatedData = $request->validate([
            'title' => 'required',
            'user_creation' => 'required',
            'point' => 'required',
            'isvalidated' => 'required',
        ]);

        $quiz = new Quiz();
        $quiz->title = $validatedData['title'];
        $quiz->user_creation = $validatedData['user_creation'];
        $quiz->point = $validatedData['point'];
        $quiz->isvalidated = $validatedData['isvalidated'];
        $quiz->save();

        return response()->json($quiz, 201);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Quiz $quiz)
    {
        // Voir un quiz
        return response()->json($quiz, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Quiz $quiz)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Quiz $quiz)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Quiz $quiz)
    {
        // Delete a quiz
       $quiz = Quiz::find($quiz->id);
         $quiz->delete();
        return response()->json('Quiz delete Successful', 204);
    }
}
