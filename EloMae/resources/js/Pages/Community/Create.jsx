import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create({ auth, errors: serverErrors = {} }) {
  const user = auth?.user ?? null;

  const isAdmin = (u) => {
    if (!u) return false;
    const val = u.is_admin;
    return (
      val == true
    );
  };

  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
    description: '',
    tags: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('communities.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <AuthenticatedLayout user={user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Criar Comunidade</h2>}>
      <Head title="Criar Comunidade" />

      <div className="py-6">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            {/* Se usuário for admin — mostra formulário */}
            {(isAdmin(user)) ? (
              <>
                <h1 className="text-2xl font-semibold mb-4">Nova Comunidade</h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block font-medium text-gray-700">
                      Nome
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Ex: Mães Empreendedoras"
                    />
                    {(errors.name || serverErrors.name) && (
                      <p className="text-red-500 text-sm mt-1">{errors.name ?? serverErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="description" className="block font-medium text-gray-700">
                      Descrição
                    </label>
                    <textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      rows={4}
                      placeholder="Fale sobre o objetivo desta comunidade..."
                    />
                    {(errors.description || serverErrors.description) && (
                      <p className="text-red-500 text-sm mt-1">{errors.description ?? serverErrors.description}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="tags" className="block font-medium text-gray-700">
                      Tags (separadas por vírgula)
                    </label>
                    <input
                      id="tags"
                      type="text"
                      value={data.tags}
                      onChange={(e) => setData('tags', e.target.value)}
                      className="mt-1 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="maternidade,apoio,negócios"
                    />
                    {(errors.tags || serverErrors.tags) && (
                      <p className="text-red-500 text-sm mt-1">{errors.tags ?? serverErrors.tags}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <Link href={route('communities.index')} className="text-gray-600 hover:underline">
                      Voltar
                    </Link>

                    <button
                      type="submit"
                      disabled={processing}
                      className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition"
                    >
                      {processing ? 'Salvando...' : 'Criar Comunidade'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Se não for admin — mostra mensagem amigável */
              <div className="text-center py-10">
                <p className="text-lg text-gray-700 mb-4">
                  Você não tem permissão para criar comunidades.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  Apenas administradores podem acessar este formulário.
                </p>

                <div className="flex justify-center gap-3">
                  <Link
                    href={route('communities.index')}
                    className="inline-block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Ver Comunidades
                  </Link>

                  {/* se o usuário for autenticado mas não admin, não mostramos link pra criar */}
                  {user ? null : (
                    <Link
                      href={route('login')}
                      className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Entrar
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
