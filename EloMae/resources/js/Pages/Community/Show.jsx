import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';

export default function Show() {
    const { auth, community } = usePage().props;
    const user = auth?.user ?? null;
    
    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir esta comunidade?')) {
            Inertia.delete(route('communities.destroy', id));
        }
    };

    if (!community) {
        return (
            <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Comunidade</h2>}>
                <Head title="Comunidade" />
                <div className="p-6 bg-white shadow-sm sm:rounded-lg">
                    <p className="text-gray-500">Carregando...</p>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Comunidade</h2>}>
            <Head title={community.nome || 'Comunidade'} />

            <div className="p-6 bg-white shadow-sm sm:rounded-lg">
                <h1 className="text-2xl font-bold">{community.nome}</h1>
                <p className="mt-2 text-gray-700">{community.descricao}</p>
                <p className="mt-4 text-sm text-gray-500">Tags: {community.tags}</p>

                <div className="mt-6">
                    <span className="text-sm text-gray-600">Criado por: {community.created_by}</span>
                </div>

                {user && user.is_admin ? (
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
                                    ): null}

                <div className="mt-4">
                    <Link href={route('communities.index')} className="text-pink-600">Voltar</Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

