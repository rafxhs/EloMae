<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Dependent;
use App\Models\DependentPhaseNotification;
use App\Services\DevelopmentPhaseService;
use App\Notifications\DevelopmentPhaseNotification;

class NotifyDependentDevelopmentPhase extends Command
{
    protected $signature = 'dependents:notify-development-phase';
    protected $description = 'Registra notificação quando o dependente entra em uma nova fase de desenvolvimento';

    public function handle(): int
    {
        $service = app(DevelopmentPhaseService::class);

        Dependent::whereNotNull('birth_date')
            ->with('user')
            ->chunk(100, function ($dependents) use ($service) {
                foreach ($dependents as $dependent) {

                    $phase = $service->getCurrentPhaseForDependent($dependent);

                    if (! $phase) {
                        continue;
                    }

                    if ($dependent->hasBeenNotifiedForPhase($phase->id)) {
                        continue;
                    }

                    // Artigo opcional da fase
                    $article = $phase->articles()->inRandomOrder()->first();

                    DependentPhaseNotification::create([
                        'dependent_id' => $dependent->id,
                        'development_phase_id' => $phase->id,
                        'notified_at' => now(),
                    ]);

                    $dependent->user->notify(
                        new DevelopmentPhaseNotification(
                            'Nova fase de desenvolvimento',
                            "{$dependent->name} entrou na fase {$phase->title}"
                        )
                    );

                    $this->info(
                        "Notificação enviada | Dependente: {$dependent->name} | Fase: {$phase->title}"
                    );
                }
            });

        return Command::SUCCESS;
    }
}
