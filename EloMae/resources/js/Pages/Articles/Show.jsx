import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import DOMPurify from 'dompurify';

export default function Show({ auth, article }) {
    const user = auth?.user ?? null;
    const isAdmin = user && user.is_admin;

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-3xl mx-auto py-6">
                <div className="mb-6">
                    <div className="flex justify-between items-start gap-4 mb-4">
                        <h1 className="text-3xl font-bold flex-1">{article.title}</h1>
                        {isAdmin ? (
                            <div className="flex gap-2 shrink-0">
                                <Link
                                    href={route('articles.edit', article.id)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
                                >
                                    Editar
                                </Link>
                                <Link
                                    href={route('articles.destroy', article.id)}
                                    method="delete"
                                    as="button"
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 whitespace-nowrap"
                                    onClick={(e) => {
                                        if (!confirm('Tem certeza que deseja deletar este artigo?')) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    Deletar
                                </Link>
                            </div>
                        ) : null}
                    </div>

                    {article.subtitle && (
                        <p className="text-xl text-gray-600 mb-2">{article.subtitle}</p>
                    )}
                    <p className="text-sm text-gray-500">
                        Autor: {article.author.name}
                    </p>
                    <p className="text-sm text-gray-400">
                        {new Date(article.created_at).toLocaleDateString('pt-BR')}
                    </p>
                </div>


                <div className="pb-6 mb-4">
                    <p className="text-gray-700">{article.summary}</p>
                </div>

                {article.tags && (
                    <div className="pb-6 mb-4">
                        <div className="flex flex-wrap gap-2">
                            {article.tags.split(',').map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                >
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                <div className="pb-6 mb-4">
                    <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content || '') }}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}