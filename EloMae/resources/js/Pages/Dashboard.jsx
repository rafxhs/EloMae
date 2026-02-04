import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    UsersIcon,
    StarIcon,
    ClockIcon,
    FireIcon,
    BookOpenIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth, needsCompletion, communities = [], favoriteArticles = [], recentArticles = [], popularArticles = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    EloMae
                </h2>
            }
        >
            <Head title="Home" />

            <main className="py-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <section className="mb-10">
                        {needsCompletion && (
                            <div className="flex items-center justify-between p-6 bg-primary-100 rounded-lg border border-primary-400">
                                <span className='font-medium text-md text-neutral-800'>Complete seu cadastro para aproveitar melhor a plataforma!</span>
                                <NavLink href="/profile" className="w-full sm:h-[45px] px-4 items-center text-white bg-primary-400 rounded-lg hover:bg-primary-300 hover:text-white">
                                    Completar Cadastro
                                </NavLink>
                            </div>
                        )}
                    </section>

                    <section className="space-y-4">
                        <div className="flex flex-row items-center justify-start gap-4">
                            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary-100">
                                <UsersIcon className="w-7 h-7 text-primary-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900">
                                Minhas comunidades
                            </h3>
                        </div>

                        {communities.length === 0 ? (
                            <p className="text-neutral-600">
                                Você ainda não participa de nenhuma comunidade.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {communities.slice(0, 3).map((community) => (
                                    <div
                                        key={community.id}
                                        className="p-6 bg-neutral-200 rounded-xl shadow-sm space-y-2"
                                    >
                                        <h4 className="font-semibold text-primary-700">
                                            {community.name}
                                        </h4>
                                        <p className="text-sm text-neutral-700">
                                            {community.description}
                                        </p>
                                    </div>
                                ))}

                                {communities.length > 4 && (
                                    <div className="flex justify-end pt-4">
                                        <Link
                                            href={route('communities.index')}
                                            className="text-neutral-700 font-medium hover:underline"
                                        >
                                            Ver mais
                                        </Link>
                                    </div>
                                )}

                            </div>
                        )}
                    </section>

                    <section className="mt-20 space-y-10">
                        <div className="flex flex-row items-center justify-start gap-4">
                            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary-100">
                                <BookOpenIcon className="w-7 h-7 text-primary-600" />
                            </div>
                            <h3 className='text-2xl font-medium text-neutral-900 py-8'>
                                Artigos para você
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            <div className="bg-neutral-200 p-6 rounded-xl shadow-sm space-y-4">
                                <div className="flex items-center gap-2">
                                    <StarIcon className="w-8 h-8 text-yellow-500" />
                                    <h4 className="font-semibold text-primary-700">
                                        Favoritos
                                    </h4>
                                </div>

                                {favoriteArticles.length === 0 ? (
                                    <p className="text-sm text-neutral-600">
                                        Você ainda não favoritou artigos.
                                    </p>
                                ) : (
                                    <div className="divide-y divide-neutral-300 space-y-4">
                                        {favoriteArticles.slice(0, 4).map(article => (
                                            <Link
                                                key={article.id}
                                                href={route('articles.show', article.id)}
                                                className="block text-sm text-neutral-700 hover:text-primary-600"
                                            >
                                                <h5 className="font-medium text-neutral-800 p-2">
                                                    {article.title}
                                                </h5>
                                                <p className="text-xs text-neutral-600 p-2">
                                                    {article.summary}
                                                </p>
                                            </Link>
                                        ))}

                                        {favoriteArticles.length > 4 && (
                                            <div className="flex justify-end pt-4">
                                                <Link
                                                    href={route('articles.index')}
                                                    className="text-neutral-700 font-medium hover:underline"
                                                >
                                                    Ver mais
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="bg-neutral-200 p-6 rounded-xl shadow-sm space-y-4">
                                <div className="flex items-center gap-2">
                                    <ClockIcon className="w-8 h-8 text-primary-600" />
                                    <h4 className="font-semibold text-primary-700">
                                        Lidos recentemente
                                    </h4>
                                </div>

                                {recentArticles.length === 0 ? (
                                    <p className="text-sm text-neutral-600">
                                        Você ainda não leu artigos.
                                    </p>
                                ) : (
                                    <div className="divide-y divide-neutral-300">
                                        {recentArticles.slice(0, 4).map(article => (
                                            <Link
                                                key={article.id}
                                                href={route('articles.show', article.id)}
                                                className="block text-sm text-neutral-700 hover:text-primary-600 py-2"
                                            >
                                                <h5 className="font-medium text-neutral-800">{article.title}</h5>
                                                <p className="text-xs text-neutral-600">{article.summary}</p>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="bg-neutral-200 p-6 rounded-xl shadow-sm space-y-4">
                                <div className="flex items-center gap-2">
                                    <FireIcon className="w-8 h-8 text-orange-700" />
                                    <h3 className="text-xl font-semibold text-neutral-900">
                                        Artigos mais lidos
                                    </h3>
                                </div>

                                {popularArticles.length === 0 ? (
                                    <p className="text-neutral-600">
                                        Nenhum artigo popular ainda.
                                    </p>
                                ) : (
                                    <div className="divide-y divide-neutral-300 space-y-4">
                                        {popularArticles.slice(0, 4).map(article => (
                                            <Link
                                                key={article.id}
                                                href={route('articles.show', article.id)}
                                                className="block text-neutral-700 hover:text-primary-600 py-2"
                                            >
                                                <h5 className="font-medium text-neutral-800 p-2">
                                                    {article.title}
                                                </h5>
                                                <p className="text-xs text-neutral-600 p-2">
                                                    {article.summary}
                                                </p>
                                            </Link>
                                        ))}

                                        {popularArticles.length > 4 && (
                                            <div className="flex justify-end pt-4">
                                                <Link
                                                    href={route('articles.index')}
                                                    className="text-neutral-700 font-medium hover:underline"
                                                >
                                                    Ver mais
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
