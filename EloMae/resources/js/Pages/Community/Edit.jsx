import React from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
                // opcional: flash, redirecionamento, etc.
            },
        });
    };

    const isAdmin = (u) => !!(u && u.is_admin);

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Editar Comunidade</h2>}>
            <Head title={`Editar: ${data.name || 'Comunidade'}`} />

            <form onSubmit={handleSubmit} className="p-6 bg-white shadow-sm sm:rounded-lg space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full rounded border-gray-300"
                    />
                    {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Descrição</label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="mt-1 block w-full rounded border-gray-300"
                    />
                    {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Tags (CSV)</label>
                    <input
                        value={data.tags}
                        onChange={(e) => setData('tags', e.target.value)}
                        className="mt-1 block w-full rounded border-gray-300"
                    />
                    {errors.tags && <div className="text-red-600 text-sm">{errors.tags}</div>}
                </div>

                <div className="flex items-center gap-3">
                    <Link href={route('communities.show', community.id)} className="text-gray-600">Cancelar</Link>
                    <button type="submit" disabled={processing} className="bg-pink-500 text-white px-4 py-2 rounded">
                        Salvar
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}

