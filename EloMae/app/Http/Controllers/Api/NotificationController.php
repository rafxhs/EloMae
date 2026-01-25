<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Retorna todas as notificações do usuário autenticado
     */
    public function index(Request $request)
    {
        return $request->user()
            ->notifications()
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Retorna a quantidade de notificações não lidas
     */
    public function unreadCount(Request $request)
    {
        return [
            'unread' => $request->user()
                ->unreadNotifications()
                ->count()
        ];
    }

    /**
     * Marca uma notificação como lida
     */
    public function markAsRead(Request $request, string $id)
    {
        $notification = $request->user()
            ->notifications()
            ->where('id', $id)
            ->firstOrFail();

        $notification->markAsRead();

        return response()->noContent();
    }
}
