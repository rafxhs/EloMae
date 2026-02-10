import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import LinkButton from '@/Components/LinkButton';

export default function Create({ auth, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        subtitle: '',
        summary: '',
        content: '',
        tags: '',
        category_id: categories.length > 0 ? categories[0].id : null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('articles.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>

            <div className="max-w-4xl mx-auto py-10 relative">
                <LinkButton
                    href={route("articles.index")}
                    className="absolute right-4 flex items-center justify-center"
                >
                    Voltar
                </LinkButton>

                <h1 className="text-2xl font-bold mb-4">Criar Artigo</h1>

                <form onSubmit={submit} className="text-lg space-y-6 mt-6 border border-gray-300 p-6 rounded">

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
                        <label>Subtitulo (Opcional)</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={data.subtitle}
                            onChange={(e) => setData('subtitle', e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Categoria</label>
                        <select
                            className="w-full border rounded p-2"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        {errors.category_id && (
                            <p className="text-red-500">{errors.category_id}</p>
                        )}
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
                        <label>Tags (separadas por vírgula)</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={data.tags}
                            onChange={(e) => setData('tags', e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Conteúdo do Artigo</label>
                        <div className="border rounded py-2 border-gray-500">
                            <Editor
                                apiKey="upn2cekie3uitu1npf9iisp2gz4sc26uulghlk52fr1s1aq4"
                                value={data.content}
                                init={{
                                    height: 400,
                                    menubar: false,
                                    entity_encoding: "raw",
                                    entities: "160,nbsp",
                                    plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste help wordcount',
                                    toolbar:
                                        'undo redo | formatselect | bold italic backcolor | \n' +
                                        'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
                                }}
                                onEditorChange={(content) => setData('content', content)}
                            />
                        </div>
                        {errors.content && (
                            <p className="text-red-500">{errors.content}</p>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            disabled={processing}
                            className="w-[500px] bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 transition"
                        >
                            {processing ? 'Salvando...' : 'Criar Artigo'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
