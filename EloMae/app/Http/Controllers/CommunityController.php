<?php

namespace App\Http\Controllers;

use App\Models\Community;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCommunityRequest;
use App\Http\Requests\UpdateCommunityRequest;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function index(Request $request)
    {
        $query = Community::query();

        if ($request->filled('tag')) {
            $tag = $request->get('tag');
            try {
                $query->whereJsonContains('tags', $tag);
            } catch (\Throwable $e) {
                $query->where('tags', 'like', "%{$tag}%");
            }
        }

        if ($request->filled('q')) {
            $q = $request->get('q');
            $query->where(function ($sub) use ($q) {
                $sub->where('name', 'like', "%{$q}%")
                    ->orWhere('description', 'like', "%{$q}%")
                    ->orWhere('nome', 'like', "%{$q}%")
                    ->orWhere('descricao', 'like', "%{$q}%");
            });
        }

        $items = $query->orderBy('created_at', 'desc')->get();

        $communities = $items->map(function (Community $c) {
            $nome = $c->name ?? $c->nome ?? '';
            $descricao = $c->description ?? $c->descricao ?? '';

            $rawTags = null;
            if (is_array($c->tags)) {
                $rawTags = $c->tags;
            } elseif ($c->tags instanceof \Illuminate\Support\Collection) {
                $rawTags = $c->tags->toArray();
            } elseif (is_string($c->tags) && strlen($c->tags) > 0) {
                $decoded = json_decode($c->tags, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    $rawTags = $decoded;
                } else {
                    $rawTags = array_map('trim', explode(',', $c->tags));
                }
            } else {
                $rawTags = [];
            }

            $tagsCsv = implode(',', array_filter(array_map('trim', $rawTags)));

            return [
                'id' => $c->id,
                'nome' => $nome,
                'descricao' => $descricao,
                'tags' => $tagsCsv,
                'created_by' => $c->created_by,
                'created_at' => $c->created_at ? $c->created_at->toDateTimeString() : null,
                'updated_at' => $c->updated_at ? $c->updated_at->toDateTimeString() : null,
            ];
        })->values();

        return Inertia::render('Community/Index', [
            'auth' => [
                'user' => $request->user() ? $request->user()->only(['id','name','email','is_admin']) : null,
            ],
            'communities' => $communities,
        ]);
    }

    // Exibir formulário de criação (página Inertia)
    public function create(Request $request)
    {
        return Inertia::render('Community/Create', [
            'auth' => [
                'user' => $request->user() ? $request->user()->only(['id','name','email','is_admin']) : null,
            ],
        ]);
    }

    public function store(StoreCommunityRequest $request)
    {
       $this->authorize('create', Community::class);

    $data = $request->validated();
    $data['created_by'] = $request->user()->id;

    $community = Community::create($data);

    return redirect()->route('communities.index')
                     ->with('success', 'Comunidade criada com sucesso.');
}

    public function show(Community $community)
    {
        // Se você tem página Inertia para show:
        $payload = [
            'id' => $community->id,
            'nome' => $community->name ?? $community->nome ?? '',
            'descricao' => $community->description ?? $community->descricao ?? '',
            'tags' => is_string($community->tags) ? $community->tags : (is_array($community->tags) ? implode(',', $community->tags) : ''),
            'created_by' => $community->created_by,
        ];

        return Inertia::render('Community/Show', [
            'community' => $payload,
            'auth' => [
                'user' => request()->user() ? request()->user()->only(['id','name','email','is_admin']) : null,
            ],
        ]);
    }

    // Exibir formulário de edição
    public function edit(Request $request, Community $community)
    {
        $payload = [
            'id' => $community->id,
            'nome' => $community->name ?? $community->nome ?? '',
            'descricao' => $community->description ?? $community->descricao ?? '',
            'tags' => is_string($community->tags) ? $community->tags : (is_array($community->tags) ? implode(',', $community->tags) : ''),
        ];

        return Inertia::render('Community/Edit', [
            'community' => $payload,
            'auth' => [
                'user' => $request->user() ? $request->user()->only(['id','name','email','is_admin']) : null,
            ],
        ]);
    }

    public function update(UpdateCommunityRequest $request, Community $community)
    {
        $community->update($request->validated());

        return redirect()->route('communities.index')
            ->with('success', 'Comunidade atualizada.');
    }

    public function destroy(Request $request, Community $community)
    {
        $this->authorize('delete', $community);
        $community->delete();

        return redirect()->route('communities.index')
            ->with('success', 'Comunidade removida.');
    }
}
