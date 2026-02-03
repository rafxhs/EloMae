<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Faq;

class FaqController extends Controller
{
    public function index(Request $request)
    {
        $query = Faq::query();

        if ($request->search) {
            $query->where('question', 'like', '%' . $request->search . '%');
        }

        if ($request->category) {
            $query->where('category', $request->category);
        }

        return Inertia::render('Faq/Index', [
            'faqs' => $query->get(),
            'filters' => $request->only(['search', 'category']),
        ]);
    }
}
