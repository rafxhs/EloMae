<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class DevelopmentPhaseNotification extends Notification
{
    use Queueable;

    protected string $title;
    protected string $message;
    protected array $articles;
    protected array $phase;

    public function __construct(
        string $title,
        string $message,
        $phase,
        $articles
    ) {
        $this->title = $title;
        $this->message = $message;
        $this->phase = [
            'id' => $phase->id,
            'title' => $phase->title,
        ];

        // Apenas id + título (pronto para UI)
        $this->articles = $articles->map(fn ($article) => [
            'id' => $article->id,
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
            'title' => $this->title,
            'message' => $this->message,
            'phase' => $this->phase,
            'articles' => $this->articles,
        ];
    }
}
