<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('dep_phase_noti', function (Blueprint $table) {
            $table->id();

            $table->foreignId('dependent_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('development_phase_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->timestamp('notified_at');

            $table->unique(
                ['dependent_id', 'development_phase_id'],
                'dep_phase_unique'
            );
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dependent_phase_notifications');
    }
};
