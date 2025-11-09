import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index() {
    const { auth, communities } = usePage().props;
    const user = auth?.user ?? null;

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir esta comunidade?')) {
            Inertia.delete(route('communities.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Comunidades</h2>}
        >
            <Head title="Comunidades" />

            <div className="py-8 px-4 max-w-6xl mx-auto">
                {user && user.is_admin && (
                    <div className="mb-6">
                        <Link
                            href={route('communities.create')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            + Criar nova comunidade
                        </Link>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {communities && communities.length > 0 ? (
                        communities.map((community) => (
                            <div
                                key={community.id}
                                className="p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {community.nome}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">{community.descricao}</p>

                                {community.tags && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {community.tags.split(',').map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    <Link
                                        href={route('communities.show', community.id)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Ver detalhes
                                    </Link>

                                    {user && user.is_admin && (
                                        <div className="flex gap-3">
                                            <Link
                                                href={route('communities.edit', community.id)}
                                                className="text-yellow-600 hover:underline text-sm"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(community.id)}
                                                className="text-red-600 hover:underline text-sm"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Nenhuma comunidade cadastrada ainda.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
