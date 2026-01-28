import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import NavLink from "@/Components/NavLink";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
    auth,
    needsCompletion,
    communities = [],
    favoriteArticles = [],
    recommendedArticles = [],
}) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Aviso de cadastro incompleto */}
                    {needsCompletion && (
                        <div className="flex items-center justify-between p-6 bg-pink-100 border border-pink-300 rounded-lg">
                            <span className="text-sm text-gray-700">
                                Complete seu cadastro para aproveitar melhor a
                                plataforma.
                            </span>

                            <NavLink
                                href="/profile"
                                className="px-6 py-3 text-white bg-pink-500 rounded-lg hover:bg-pink-700 transition"
                            >
                                Completar cadastro
                            </NavLink>
                        </div>
                    )}

                    {/* Comunidades da usuária */}
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                Minhas comunidades
                            </h3>

                            {communities.length === 0 ? (
                                <div className="flex flex-col items-center gap-4 py-8 text-center">
                                    <p className="text-gray-500">
                                        Você ainda não participa de nenhuma
                                        comunidade.
                                    </p>

                                    <Link
                                        href={route("communities.index")}
                                        className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                                    >
                                        Explorar comunidades
                                    </Link>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {communities.map((community) => (
                                        <li
                                            key={community.id}
                                            className="p-4 border rounded-lg hover:bg-gray-50 transition"
                                        >
                                            <Link
                                                href={`/communities/${community.id}`}
                                                className="text-lg font-medium text-pink-600 hover:underline"
                                            >
                                                {community.nome}
                                            </Link>

                                            {community.descricao && (
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {community.descricao}
                                                </p>
                                            )}

                                            <p className="mt-2 text-xs text-gray-500">
                                                {community.members_count}{" "}
                                                participantes
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Artigos recomendados */}
                    {recommendedArticles.length > 0 && (
                        <div className="bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                    Artigos recomendados para você
                                </h3>

                                <ul className="space-y-4">
                                    {recommendedArticles.map((article) => (
                                        <li
                                            key={article.id}
                                            className="p-4 border rounded-lg hover:bg-gray-50 transition"
                                        >
                                            <Link
                                                href={`/articles/${article.id}`}
                                                className="text-lg font-medium text-pink-600 hover:underline"
                                            >
                                                {article.title}
                                            </Link>

                                            {article.summary && (
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {article.summary}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Artigos Favoritos */}
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="mb-4 text-lg font-semibold text-gray-800">
                                Meus artigos favoritos
                            </h3>

                            {favoriteArticles.length === 0 ? (
                                <div className="flex flex-col items-center gap-4 py-8 text-center">
                                    <p className="text-gray-500">
                                        Você ainda não favoritou nenhum artigo.
                                    </p>

                                    <Link
                                        href={route("articles.index")}
                                        className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-pink-600 rounded-lg hover:bg-pink-700 transition"
                                    >
                                        Explorar artigos
                                    </Link>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {favoriteArticles.map((article) => (
                                        <li
                                            key={article.id}
                                            className="p-4 border rounded-lg hover:bg-gray-50 transition"
                                        >
                                            <Link
                                                href={`/articles/${article.id}`}
                                                className="text-lg font-medium text-pink-600 hover:underline"
                                            >
                                                {article.title}
                                            </Link>

                                            {article.summary && (
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {article.summary}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>



                </div>
            </div>
        </AuthenticatedLayout>
    );
}
