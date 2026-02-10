import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LinkButton from '@/Components/LinkButton';

export default function Edit() {
    const { auth, community, errors: serverErrors = {} } = usePage().props;
    const user = auth?.user ?? null;

    const { data, setData, patch, processing, errors } = useForm({
        name: community?.nome ?? community?.name ?? '',
        description: community?.descricao ?? community?.description ?? '',
        tags: community?.tags ?? '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('communities.update', community.id), {
            onSuccess: () => {
            },
        });
    };

    const isAdmin = (u) => !!(u && u.is_admin);

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Editar Comunidade</h2>}>
            <Head title={`Editar: ${data.name || 'Comunidade'}`} />

            <div className="max-w-4xl mx-auto py-10 relative">
                <LinkButton
                    href={route('communities.show', community.id)}
                    className="absolute right-4 flex items-center justify-center"
                >
                    Voltar
                </LinkButton>
                <h1 className="text-2xl font-bold mb-4">Editar Comunidade</h1>

                <form onSubmit={handleSubmit} className="text-lg space-y-6 mt-6 border border-gray-300 p-6 rounded">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tags (CSV)</label>
                        <input
                            value={data.tags}
                            onChange={(e) => setData('tags', e.target.value)}
                            className="w-full border rounded p-2"
                        />
                        {errors.tags && <div className="text-red-600 text-sm">{errors.tags}</div>}
                    </div>

                    <div className="flex gap-2 justify-center">
                        <button
                            type='submit'
                            disabled={processing}
                            className="w-[300px] h-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {processing ? 'Salvando...' : 'Salvar Alterações'}
                        </button>
                        <Link
                            href={route('communities.show', community.id)}
                            className="w-[200px] bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                            Cancelar Alterações
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

