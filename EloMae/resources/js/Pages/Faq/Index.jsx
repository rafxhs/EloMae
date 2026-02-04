import { useState } from "react";
import { router, usePage, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { HiSearch } from "react-icons/hi";

export default function Index({ faqs, filters }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [category, setCategory] = useState(filters.category || "");

    function handleSearch(e) {
        e.preventDefault();
        router.get(
            route("faq.index"),
            { search, category },
            { preserveState: true }
        );
    }

    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout user={auth.user}>
            <Head title="Perguntas Frequentes" />
            <div className="max-w-4xl mx-auto py-10 relative">
                <div className="flex items-center justify-between gap-10 mb-6 mt-6 border-b pb-4 shadow-lg">
                    <div className="max-w-md">
                        <h1 className="text-3xl font-bold text-purple-600">
                            Perguntas Frequentes
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Encontre respostas sobre a plataforma,
                            funcionalidades e uso geral do Elo Mãe.
                        </p>
                    </div>

                    {/* <img
                        src="/images/faq.svg"
                        alt="Ilustração FAQ"
                        className="w-80 h-auto"
                    /> */}
                </div>

                <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                    <div className="relative bg-gray-200 rounded-lg mt-4 flex-[1]">
                        <input
                            type="text"
                            placeholder="Pesquisar perguntas..."
                            className="pl-2 pr-8 py-2 w-full bg-gray-200 text-gray-700 text-sm rounded-lg border-gray-300 focus:outline-none focus:ring-0"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit">
                            <HiSearch className="absolute pr-2 right-0 top-1/2 -translate-y-1/2 hover:text-gray-300 h-8 w-8" />
                        </button>
                    </div>

                    <div className="relative bg-gray-200 rounded-lg mt-4">
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                router.get(
                                    route("faq.index"),
                                    { search, category: e.target.value },
                                    { preserveState: true }
                                );
                            }}
                            className="py-2 pr-0 bg-gray-200 text-gray-700 text-sm rounded-lg border-gray-300 focus:outline-none focus:ring-0"
                        >
                            <option value="">Filtrar por categorias</option>
                            <option value="plataforma">
                                Sobre a plataforma
                            </option>
                            <option value="artigos">Artigos</option>
                            <option value="comunidades">Comunidades</option>
                            <option value="mapa">Mapa</option>
                            <option value="cadastro">Cadastro</option>
                        </select>
                    </div>
                </form>

                <div className="space-y-4">
                    {faqs.length === 0 ? (
                        <div className="text-center text-gray-500 py-10 border rounded bg-white shadow flex flex-col items-center gap-4">
                            <HiSearch className="h-12 w-12 text-gray-400" />
                            <p>Ops!... Nenhuma pergunta encontrada.</p>
                            <p>
                                Tente usar o campo de pesquisa ou filtrar por
                                categoria.
                            </p>
                        </div>
                    ) : (
                        faqs.map((faq) => (
                            <div
                                key={faq.id}
                                className="p-4 bg-white border shadow rounded hover:shadow-lg transition"
                            >
                                <h3 className="text-lg font-semibold">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    {faq.answer}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Layout>
    );
}
