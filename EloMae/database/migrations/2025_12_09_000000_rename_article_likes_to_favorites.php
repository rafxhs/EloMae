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
        if (Schema::hasTable('article_likes') && !Schema::hasTable('article_favorites')) {
            Schema::rename('article_likes', 'article_favorites');
            return;
        }

        if (!Schema::hasTable('article_favorites')) {
            Schema::create('article_favorites', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->foreignId('article_id')->constrained('articles')->cascadeOnDelete();
                $table->timestamps();
                $table->unique(['user_id', 'article_id']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('article_favorites')) {
            Schema::dropIfExists('article_favorites');
        }
    }
};
