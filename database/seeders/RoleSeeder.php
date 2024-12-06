<?php

namespace Database\Seeders;

use App\Models\RoleEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insere des roles pre definit
        RoleEnum::create([
            'role' => 'admin',
        ]);

        RoleEnum::create([
            'role' => 'user',
        ]);
    }
}
