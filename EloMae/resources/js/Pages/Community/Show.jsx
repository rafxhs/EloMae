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


    const leaveCommunity = async () => {
        try {
            await axios.post(`/communities/${community.id}/leave`);
            window.location.href = route('communities.index');
        } catch (error) {
            console.error("Erro ao sair:", error);
        }
    };


    return (
       <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Comunidade</h2>}>
        <Head title={community.nome || "Comunidade"} />

        <div className="p-6">
            <div className="bg-white shadow-sm sm:rounded-lg p-6 space-y-6 relative">

                
                    <button
                        onClick={leaveCommunity}
                        className="absolute top-6 right-6 bg-red-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-600 transition"
                    >
                        Sair da comunidade
                    </button>
               
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{community.nome}</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {community.members_count} membros
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Descrição</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {community.descricao}
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
                    <p className="text-gray-600 text-sm">{community.tags}</p>
                </div>

                {user && user.is_admin && (
                    <div className="flex gap-4 items-center border-t pt-4">

                        <Link
                            href={route("communities.edit", community.id)}
                            className="px-4 py-2 rounded-lg bg-yellow-500 text-white text-sm font-semibold shadow hover:bg-yellow-400 transition"
                        >
                            Editar
                        </Link>

                        <button
                            onClick={() => handleDelete(community.id)}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold shadow hover:bg-red-500 transition"
                        >
                            Excluir
                        </button>
                    </div>
                )}

                <div className="pt-2">
                    <Link
                        href={route("communities.index")}
                        className="inline-block px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold text-sm shadow hover:bg-purple-400 transition"
                    >
                        Voltar
                    </Link>
                </div>

            </div>
        </div>
    </AuthenticatedLayout>


    );
}

