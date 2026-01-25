<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('development_phases', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->unsignedSmallInteger('start_month');
            $table->unsignedSmallInteger('end_month');
            $table->text('description')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('development_phases');
    }
};
