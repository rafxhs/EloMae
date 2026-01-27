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

                    // Fase atual
                    $phase = $service->getCurrentPhaseForDependent($dependent);
                    if (! $phase) {
                        continue;
                    }

                    // Evita duplicação histórica (dependente + fase)
                    if ($dependent->hasBeenNotifiedForPhase($phase->id)) {
                        continue;
                    }

                    $userId  = $dependent->user->id;
                    $phaseId = $phase->id;
                    $key     = "{$userId}-{$phaseId}";

                    if (isset($notifiedInThisRun[$key])) {
                        continue;
                    }

                    // Busca artigos
                    $articles = $phase->articles()
                        ->take(3)
                        ->get();

                    // Registra controle histórico
                    DependentPhaseNotification::create([
                        'dependent_id' => $dependent->id,
                        'development_phase_id' => $phase->id,
                        'notified_at' => now(),
                    ]);

                    // Envia notificação
                    $dependent->user->notify(
                        new DevelopmentPhaseNotification(
                            'Nova fase de desenvolvimento',
                            "{$dependent->name} entrou na fase {$phase->title}",
                            $phase,
                            $articles
                        )
                    );

                    // Marca como notificado nesta execução
                    $notifiedInThisRun[$key] = true;

                    $this->info(
                        "Notificação enviada | Dependente: {$dependent->name} | Fase: {$phase->title}"
                    );
                }
            });

        return Command::SUCCESS;
    }
}
