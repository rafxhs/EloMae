<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $articles = Article::with('author')
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('summary', 'like', "%{$search}%")
                    ->orWhere('tags', 'like', "%{$search}%");
            })
            ->latest()
            ->get();

        return inertia('Articles/Index', [
            'articles' => $articles,
            'filters' => [
                'search' => $search,
            ],
            'auth' => [
                'user' => $request->user(),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('create', Article::class);

        return Inertia::render('Articles/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'subtitle' => 'nullable',
            'summary' => 'required',
            'content' => 'required',
            'tags' => 'nullable|string',
        ]);

        $data['author_id'] = $request->user()->id;

        Article::create($data);

        return redirect()->route('articles.index')
            ->with('success', 'Artigo criado com sucesso!');
    }

    public function show(Article $article)
    {
        return Inertia::render('Articles/Show', [
            'article' => $article->load('author')
        ]);
    }

    public function edit(Article $article)
    {
        $this->authorize('update', $article);

        return Inertia::render('Articles/Edit', [
            'article' => $article
        ]);
    }

    public function update(Request $request, Article $article)
    {
        $this->authorize('update', $article);

        $data = $request->validate([
            'title' => 'required',
            'subtitle' => 'nullable',
            'summary' => 'required',
            'content' => 'required',
            'tags' => 'nullable|string',
        ]);

        $article->update($data);

        return redirect()->route('articles.show', $article->id)
            ->with('success', 'Artigo atualizado com sucesso!');
    }

    public function destroy(Article $article)
    {
        $this->authorize('delete', $article);

        $article->delete();

        return redirect()->route('articles.index')
            ->with('success', 'Artigo deletado com sucesso!');
    }
}
