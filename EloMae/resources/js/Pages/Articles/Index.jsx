import LinkButton from "@/Components/LinkButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage, router, Head} from "@inertiajs/react";
import { useState } from "react";
import { HiPlus, HiSearch } from "react-icons/hi";

export default function Index() {
    const { auth, articles, filters, categories } = usePage().props;
    const user = auth?.user ?? null;
    const [search, setSearch] = useState(filters?.search ?? "");
    const [category, setCategory] = useState(filters?.category ?? "");

    function handleSearch(e) {
        e.preventDefault();
        router.get(
            route("articles.index"),
            { search, category },
            { preserveState: true }
        );
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-4xl mx-auto py-10 relative">
                {user && user.is_admin ? (
                    <LinkButton
                        href={route("articles.create")}
                        className="absolute left-4 flex items-center justify-center"
                    >
                        <HiPlus className="h-6 w-6" />
                    </LinkButton>
                ) : null}

            <Head title="Artigos" />

                <div className="flex items-center justify-between gap-10 mb-6 mt-6 border-b pb-4 shadow-lg">
                    <div className="max-w-md">
                        <h1 className="text-3xl font-bold text-purple-600">
                            Artigos
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Explore nossos artigos sobre maternidade, direitos,
                            bem-estar, desenvolvimento infantil e muito mais.
                        </p>
                    </div>

                    <img
                        src="/images/articles.svg"
                        alt="Mulher lendo artigos"
                        className="w-80 h-auto"
                    />
                </div>

                <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                    <div className="relative bg-gray-200 rounded-lg mt-4 flex-[1]">
                        <input
                            type="text"
                            placeholder="Pesquisar artigos..."
                            className="pl-2 pr-8 py-2 w-full bg-gray-200 text-gray-700 text-sm rounded-lg border-gray-300 focus:outline-none focus:ring-0"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit">
                            <HiSearch className="absolute pr-2 right-0 top-1/2 -translate-y-1/2 hover:text-gray-300 h-8 w-8" />
                        </button>
                    </div>

                    <div className="relative bg-gray-200 rounded-lg mt-4 ">
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                router.get(
                                    route("articles.index"),
                                    { search, category: e.target.value },
                                    { preserveState: true }
                                );
                            }}
                            className="py-2 pr-0 bg-gray-200 text-gray-700 text-sm rounded-lg border-gray-300 focus:outline-none focus:ring-0"
                        >
                            <option value="">Filtrar por categorias</option>

                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>

                <div className="space-y-4">
                    {articles.length === 0 ? (
                        <div className="text-center text-gray-500 py-10 border hover:text-gray-500 rounded bg-white shadow flex flex-col items-center gap-4">
                            <HiSearch className="h-12 w-12 text-gray-400" />

                            <p>
                                Ops!... Nenhum artigo encontrado para sua
                                pesquisa.
                            </p>
                            <p>
                                Tente pesquisar por categoria, tags ou use o
                                filtro de pesquisa.
                            </p>

                            <LinkButton href={route("articles.index")}>
                                Limpar e voltar
                            </LinkButton>
                        </div>
                    ) : (
                        articles.map((article) => (
                            <div
                                key={article.id}
                                className="p-4 bg-white border hover:shadow-purple-200 shadow rounded hover:shadow-lg transition cursor-pointer block"
                            >
                                <Link href={route("articles.show", article.id)}>
                                    <p className="text-xs text-gray-500">
                                        Autor: {article.author.name}
                                    </p>

                                    <h2 className="text-xl font-semibold hover:text-purple-700 mt-2">
                                        {article.title}
                                    </h2>

                                    {article.subtitle && (
                                        <p>{article.subtitle}</p>
                                    )}

                                    <p className="text-xs text-gray-400 mt-0">
                                        Tags: {article.tags}
                                    </p>

                                    <p className="mt-3">{article.summary}</p>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
