<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'community_id' => 'required|integer|exists:communities,id',
        ]);

        $messages = Message::with('user')
            ->where('community_id', $request->community_id)
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json($messages);
    }

    public function store(Request $request)
    {
        $request->validate([
            'community_id' => 'required|integer|exists:communities,id',
            'message' => 'required|string|max:2000',
        ]);

        $msg = Message::create([
            'user_id' => $request->user()->id,
            'community_id' => $request->community_id,
            'message' => $request->message,
        ]);

        return response()->json($msg->load('user'), 201);
    }
}
