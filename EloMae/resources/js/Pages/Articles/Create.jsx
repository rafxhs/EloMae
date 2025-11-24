import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        summary: '',
        content: '',
        tags: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('articles.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            
            <div className="max-w-3xl mx-auto py-6">
                <h1 className="text-2xl font-bold mb-4">Criar Artigo</h1>

                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <label>Título</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <p className="text-red-500">{errors.title}</p>}
                    </div>

                    <div>
                        <label>Subtitulo</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={data.subtitle}
                            onChange={(e) => setData('subtitle', e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Resumo</label>
                        <textarea
                            className="w-full border rounded p-2"
                            rows="3"
                            value={data.summary}
                            onChange={(e) => setData('summary', e.target.value)}
                        />
                        {errors.summary && (
                            <p className="text-red-500">{errors.summary}</p>
                        )}
                    </div>

                    <div>
                        <label>Conteúdo do Artigo</label>
                        <textarea
                            className="w-full border rounded p-2"
                            rows="12"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                        />
                        {errors.content && (
                            <p className="text-red-500">{errors.content}</p>
                        )}
                    </div>

                    <div>
                        <label>Tags (separadas por vírgula)</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={data.tags}
                            onChange={(e) => setData('tags', e.target.value)}
                        />
                    </div>

                    <button
                        disabled={processing}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Salvar
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
