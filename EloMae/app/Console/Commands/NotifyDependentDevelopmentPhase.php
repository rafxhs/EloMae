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

                    // Descobre a fase atual
                    $phase = $service->getCurrentPhaseForDependent($dependent);

                    if (! $phase) {
                        continue;
                    }

                    // Evita duplicação (regra atual do projeto)
                    if ($dependent->hasBeenNotifiedForPhase($phase->id)) {
                        continue;
                    }

                    //  Busca até 3 artigos relacionados à fase
                    $articles = $phase->articles()
                        ->take(3)
                        ->get();

                    // Registra controle interno de notificação
                    DependentPhaseNotification::create([
                        'dependent_id' => $dependent->id,
                        'development_phase_id' => $phase->id,
                        'notified_at' => now(),
                    ]);

                    // Envia notificação com artigos
                    $dependent->user->notify(
                        new DevelopmentPhaseNotification(
                            'Nova fase de desenvolvimento',
                            "{$dependent->name} entrou na fase {$phase->title}",
                            $phase,
                            $articles
                        )
                    );

                    // Log informativo
                    $this->info(
                        "Notificação enviada | Dependente: {$dependent->name} | Fase: {$phase->title}"
                    );
                }
            });

        return Command::SUCCESS;
    }
}
