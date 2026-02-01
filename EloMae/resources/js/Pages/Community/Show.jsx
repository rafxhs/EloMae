import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import axios from 'axios';
import LinkButton from '@/Components/LinkButton';

export default function Show() {
    const { auth, community } = usePage().props;
    const user = auth?.user ?? null;

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);

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
        setIsLeaving(true);

        try {
            await axios.post(`/communities/${community.id}/leave`);
            window.location.href = route('communities.index');
        } catch (error) {
            console.error('Erro ao sair:', error);
        } finally {
            setIsLeaving(false);
            setShowConfirmModal(false);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={community.nome} />

            <div className="max-w-4xl mx-auto py-10 p-6 relative shadow-lg bg-white rounded-lg">
                <LinkButton
                    href={route('communities.index')}
                    className="absolute right-4 flex items-center justify-center"
                >
                    Voltar
                </LinkButton>

                <div className="mb-6 border-b pb-4 border-gray-300">
                    <h1 className="text-3xl font-bold text-gray-800">{community.nome}</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {community.members_count} Mães fazem parte dessa comunidade!
                    </p>
                </div>

                <div className="w-full flex flex-col items-center mb-6">
                    <img
                        src="/images/community-default.jpg"
                        alt={`Foto da comunidade ${community.nome}`}
                        className="rounded-lg w-full max-w-md"
                    />
                </div>

                {community.tags && (
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-700 mb-2">Tags</h3>
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

                <div className="mb-10">
                    <h3 className="text-lg font-bold text-gray-700 mb-2">Descrição</h3>
                    <p className="text-gray-700 leading-relaxed">
                        {community.descricao}
                    </p>
                </div>

                <div className="mb-6">
                    <button
                        onClick={() => setShowConfirmModal(true)}
                        className="bg-red-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-600 transition"
                    >
                        Sair da comunidade
                    </button>
                </div>

                {user && user.is_admin ? (
                    <div className="flex gap-2 justify-center mt-6">
                        <Link
                            href={route('communities.edit', community.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 whitespace-nowrap text-center"
                        >
                            Editar
                        </Link>
                        <Link
                            href={route('communities.destroy', community.id)}
                            method="delete"
                            as="button"
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 whitespace-nowrap"
                            onClick={(e) => {
                                if (!confirm('Tem certeza que deseja excluir esta comunidade?')) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            Excluir
                        </Link>
                    </div>
                ): null}
            </div>

            {/* Modal de confirmação */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-2">
                            Sair da comunidade
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Tem certeza que deseja sair desta comunidade?
                            Você poderá entrar novamente depois.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                disabled={isLeaving}
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={leaveCommunity}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                disabled={isLeaving}
                            >
                                {isLeaving ? 'Saindo...' : 'Confirmar saída'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
