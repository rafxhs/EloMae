import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage, router } from "@inertiajs/react";
import { useState } from "react";

export default function Index() {
    const { auth, articles, filters } = usePage().props;
    const user = auth?.user ?? null;
    const [search, setSearch] = useState(filters?.search ?? "");

    function handleSearch(e) {
        e.preventDefault();
        router.get(
            route("articles.index"),
            { search },
            { preserveState: true }
        );
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-4xl mx-auto py-6">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">Artigos</h1>

                    {user && user.is_admin ? (
                        <Link
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            href={route("articles.create")}
                        >
                            Novo Artigo
                        </Link>
                    ) : null}
                </div>

                <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Pesquisar por título, resumo ou tags..."
                        className="flex-1 border px-3 py-2 rounded"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gray-800 text-white rounded"
                    >
                        Buscar
                    </button>
                </form>

                <div className="space-y-4">
                    {articles.length === 0 ? (
                        <div className="text-center text-gray-500 py-10 border rounded bg-white shadow flex flex-col items-center gap-4">
                            <div className="text-4xl">🔎</div>

                            <p>Nenhum artigo encontrado para sua pesquisa.</p>

                            <button
                                onClick={() =>
                                    router.get(route("articles.index"))
                                }
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                                Limpar busca
                            </button>
                        </div>
                    ) : (
                        articles.map((article) => (
                            <Link
                                key={article.id}
                                href={route("articles.show", article.id)}
                                className="p-4 bg-white shadow rounded hover:shadow-lg transition cursor-pointer block"
                            >
                                <h2 className="text-xl font-semibold hover:text-blue-600">
                                    {article.title}
                                </h2>

                                {article.subtitle && (
                                    <p className="text-gray-700">
                                        {article.subtitle}
                                    </p>
                                )}

                                <p className="text-sm text-gray-500">
                                    Autor: {article.author.name}
                                </p>

                                <p className="mt-2">{article.summary}</p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Tags: {article.tags}
                                </p>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
