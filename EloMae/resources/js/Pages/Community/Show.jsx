import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import LinkButton from '@/Components/LinkButton';

export default function Show() {
    const { auth, community } = usePage().props;
    const user = auth?.user ?? null;

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
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto py-10 p-6 relative shadow-lg">
                <LinkButton
                    href={route("communities.index")}
                    className="absolute right-4 flex items-center justify-center"
                >
                    Voltar
                </LinkButton>

                <div className="mb-6 border-b pb-4 border-gray-300 ">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{community.nome}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            {community.members_count} Mães fazem parte dessa comunidade!
                        </p>
                    </div>

                    <div className="w-full flex flex-col items-center mt-4">
                        <img src='/images/community-default.jpg' alt={`Foto da comunidade ${community.nome}`} className='mt-2 rounded-lg w-full max-w-md' />
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Tags</h3>
                        {community.tags && (
                        <div className="pb-6 mb-2">
                            <div className="flex flex-wrap gap-2">
                                {community.tags.split(',').map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-purple-100 text-purple-500 px-3 py-1 rounded-full text-sm"
                                    >
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    </div>

                    <div className="">
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Descrição</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {community.descricao}
                        </p>
                    </div>
                    <div className="pt-2 mt-10 mb-6">
                        <button
                            onClick={leaveCommunity}
                            className=" top-6 bg-red-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-600 transition"
                        >
                            Sair da comunidade
                        </button>
                    </div>
                </div>
                {user && user.is_admin ? (
                    <div className="flex gap-2 justify-center mt-6">
                        <Link
                            href={route("communities.edit", community.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap text-center"
                        >
                            Editar
                        </Link>
                        <Link
                            href={route("communities.destroy", community.id)}
                            method="delete"
                            as="button"
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 whitespace-nowrap"
                            onClick={(e) => {
                                if (!confirm('Tem certeza que deseja deletar esta comunidade?')) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            Deletar
                        </Link>
                    </div>
                ) : null}
            </div>
        </AuthenticatedLayout>


    );
}

