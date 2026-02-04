<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\ArticleVote;
use App\Models\ArticleView;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');
        $category = $request->get('category');

        $query = Article::with('author', 'category');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                ->orWhere('summary', 'like', "%{$search}%")
                ->orWhere('tags', 'like', "%{$search}%");
            });
        }

        if ($category) {
            $query->where('category_id', $category);
        }

        return inertia('Articles/Index', [
            'articles' => $query->orderBy('created_at', 'desc')->get(),
            'categories' => Category::orderBy('name')->get(['id', 'name']),
            'filters' => [
                'search' => $search,
                'category' => $category,
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('create', Article::class);

        return inertia('Articles/Create', [
        'categories' => Category::all()
    ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required',
            'subtitle' => 'nullable',
            'summary' => 'required',
            'content' => 'required',
            'tags' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $data['author_id'] = $request->user()->id;

        Article::create($data);

        return redirect()->route('articles.index')
            ->with('success', 'Artigo criado com sucesso!');
    }

    public function show(Article $article)
    {
        $user = Auth::user();

        if ($user) {
            // Registrar visualização do artigo
            ArticleView::updateOrCreate(
                [
                    'article_id' => $article->id,
                    'user_id' => $user->id,
                ],
                ['read_at' => now()]
            );
        }

        $article->loadCount([
            'votes as helpful_yes' => fn($q) => $q->where('value', 'yes'),
            'votes as helpful_no' => fn($q) => $q->where('value', 'no'),
        ]);

        $userVote = null;

        if ($user) {
            $userVote = $article->votes()
                ->where('user_id', $user->id)
                ->value('value');
        }

        return Inertia::render('Articles/Show', [
            'article' => $article->load('author', 'favorites'),
            'userVote' => $userVote,
            'favoritesCount' => $article->favorites()->count(),
            'userFavorited' => $user ? $article->favoritedBy()->where('user_id', $user->id)->exists() : false,
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
            'category_id' => 'required|exists:categories,id',
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

   public function vote(Request $request, Article $article)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $request->validate([
            'value' => 'required|in:yes,no',
        ]);

        ArticleVote::updateOrCreate(
            [
                'article_id' => $article->id,
                'user_id' => Auth::id(),
            ],
            ['value' => $request->value]
        );

        return back()->with('success', 'Voto registrado.');
    }

}
