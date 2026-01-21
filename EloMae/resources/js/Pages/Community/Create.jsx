import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LinkButton from '@/Components/LinkButton';

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

      <div className="max-w-4xl mx-auto py-10 relative">
        <LinkButton
          href={route("communities.index")}
          className="absolute right-4 flex items-center justify-center"
        >
          Voltar
        </LinkButton>
        {(isAdmin(user)) ? (
          <>
            <h1 className="text-2xl font-bold mb-4">Nova Comunidade</h1>

            <form onSubmit={handleSubmit} className="text-lg space-y-6 mt-6 border border-gray-300 p-6 rounded">
              <div>
                <label htmlFor="name" className="block font-medium text-gray-700">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="w-full border rounded p-2"
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
                  className="w-full border rounded p-2"
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
                  className="w-full border rounded p-2"
                />
                {(errors.tags || serverErrors.tags) && (
                  <p className="text-red-500 text-sm mt-1">{errors.tags ?? serverErrors.tags}</p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type='submit'
                  disabled={processing}
                  className="w-[500px] bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 transition"
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
    </AuthenticatedLayout>
  );
}
