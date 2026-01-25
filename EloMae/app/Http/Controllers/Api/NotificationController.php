<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Notifications\DatabaseNotification;

class NotificationController extends Controller
{
    public function unreadCount(Request $request)
    {
        return response()->json([
            'unread' => $request->user()->unreadNotifications()->count(),
        ]);
    }

    public function index(Request $request)
    {
        return response()->json(
            $request->user()
                ->notifications()
                ->latest()
                ->take(20)
                ->get()
        );
    }

    public function markAsRead(Request $request, $id)
    {
        $notification = DatabaseNotification::where('id', $id)
            ->where('notifiable_id', $request->user()->id)
            ->firstOrFail();

        $notification->markAsRead();

        return response()->noContent();
    }
}
