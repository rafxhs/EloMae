import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {React }  from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Index() {
    const { auth, articles } = usePage().props;
        const user = auth?.user ?? null;
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
                    ): null}
                </div>

                <div className="space-y-4">
                    {articles.map((article) => (
                        <div
                            key={article.id}
                            className="p-4 bg-white shadow rounded"
                        >
                            <h2 className="text-xl font-semibold">
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
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
