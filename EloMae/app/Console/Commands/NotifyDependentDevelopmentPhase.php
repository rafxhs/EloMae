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
        $notifiedInThisRun = [];

        Dependent::whereNotNull('birth_date')
            ->with('user')
            ->chunk(100, function ($dependents) use ($service, &$notifiedInThisRun) {

                foreach ($dependents as $dependent) {

                    $phase = $service->getCurrentPhaseForDependent($dependent);
                    if (! $phase) {
                        continue;
                    }

                    if ($dependent->hasBeenNotifiedForPhase($phase->id)) {
                        continue;
                    }

                    $userId  = $dependent->user->id;
                    $phaseId = $phase->id;
                    $key     = "{$userId}-{$phaseId}";

                    if (isset($notifiedInThisRun[$key])) {
                        continue;
                    }

                    // Artigos da fase (máx. 3)
                    $articles = $phase->articles()
                        ->take(3)
                        ->get();

                    // Controle interno
                    DependentPhaseNotification::create([
                        'dependent_id' => $dependent->id,
                        'development_phase_id' => $phase->id,
                        'notified_at' => now(),
                    ]);

                    // Envia notificação
                    $dependent->user->notify(
                        new DevelopmentPhaseNotification(
                            $dependent->name,
                            $phase->title,
                            $articles
                        )
                    );

                    $notifiedInThisRun[$key] = true;

                    $this->info(
                        "Notificação enviada | {$dependent->name} | {$phase->title}"
                    );
                }
            });

        return Command::SUCCESS;
    }
}
