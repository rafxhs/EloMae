<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DevelopmentPhaseNotification extends Notification
{
    use Queueable;

    protected string $babyName;
    protected string $phaseTitle;
    protected array $articles;

    public function __construct(
        string $babyName,
        string $phaseTitle,
        $articles
    ) {
        $this->babyName   = $babyName;
        $this->phaseTitle = $phaseTitle;

        // Apenas id + título (pronto para UI)
        $this->articles = $articles->map(fn ($article) => [
            'id'    => $article->id,
            'title' => $article->title,
        ])->values()->toArray();
    }

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toDatabase($notifiable): array
    {
        return [
            'title' => 'Seu bebê entrou em uma nova fase!',
            'message' => "{$this->babyName} entrou na fase {$this->phaseTitle}",
            'helper_text' =>
                'Para entender melhor essa nova fase do seu bebê, separamos alguns artigos que podem te ajudar.',
            'articles' => $this->articles,
        ];
    }
}
