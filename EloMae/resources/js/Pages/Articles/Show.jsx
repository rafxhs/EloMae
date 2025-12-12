import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage, router } from '@inertiajs/react';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import { AiOutlineSmile, AiOutlineMeh } from "react-icons/ai";

export default function Show({ auth, article, favoritesCount: initialFavoritesCount, userFavorited: initialUserFavorited }) {
    const user = auth?.user ?? null;
    const isAdmin = user && user.is_admin;
    const [favoritesCount, setFavoritesCount] = useState(initialFavoritesCount || 0);
    const [userFavorited, setUserFavorited] = useState(initialUserFavorited || false);
    const [isLoading, setIsLoading] = useState(false);
    const {  userVote } = usePage().props;
    const [vote, setVote] = useState(userVote);

    function sendVote(value) {
        setVote(value); 
        router.post(
            route("articles.vote", article.id),
            { value },
            {
                preserveScroll: true,
            }
        ); 
}

    const handleToggleFavorite = async () => {
        if (!user) {
            router.visit(route('login'));
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(route('articles.favorite', article.id));

            if (response.data) {
                setUserFavorited(response.data.favorited);
                setFavoritesCount(response.data.favorites_count);
            }
        } catch (error) {
            console.error('Erro ao favoritar:', error);
            alert('Erro ao favoritar o artigo. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-3xl mx-auto py-6">
                <div className="mb-6">
                    <div className="flex justify-between items-start gap-4 mb-4">
                        <h1 className="text-3xl font-bold flex-1">{article.title}</h1>
                        <div className="flex gap-2 shrink-0 flex-col">
                            <button
                                onClick={handleToggleFavorite}
                                disabled={isLoading}
                                    className={`flex items-center gap-2 px-4 py-2 rounded whitespace-nowrap transition ${userFavorited
                                            ? 'bg-white text-yellow-400 hover:bg-yellow-100'
                                            : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                        } disabled:opacity-50`}
                                title={userFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                            >
                                    {userFavorited ? (
                                        <FaStar size={18} fill="currentColor" />
                                    ) : (
                                        <FaRegStar size={18} />
                                    )}
                                <span>{favoritesCount}</span>
                            </button>
                        </div>
                    </div>

                    {article.subtitle && (
                        <p className="text-xl text-gray-600 mb-2">{article.subtitle}</p>
                    )}
                    <p className="text-sm text-gray-500">
                        Autor: {article.author.name}
                    </p>
                    <p className="text-sm text-gray-400">
                        {new Date(article.created_at).toLocaleDateString('pt-BR')}
                    </p>
                </div>


                <div className="pb-6 mb-4">
                    <p className="text-gray-700">{article.summary}</p>
                </div>

                {article.tags && (
                    <div className="pb-6 mb-4">
                        <div className="flex flex-wrap gap-2">
                            {article.tags.split(',').map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                >
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                <div className="pb-6 mb-4">
                    <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content || '') }}
                    />
                </div>


                <div className="mt-12 p-6 bg-gray-300 text-black rounded-lg flex flex-col items-center mb-6">
                <p className="text-lg mb-4">Esse artigo foi útil?</p>

                <div className="flex items-center gap-6">

                <button onClick={() => sendVote("yes")}>
                    {vote === "yes" ? (
    
                        <AiOutlineSmile size={32} className="text-green-600" />
                    ) : (
                        <AiOutlineSmile size={32} className="text-gray-400" />
                    )}
                </button>

                <button onClick={() => sendVote("no")}>
                    {vote === "no" ? (
                        <AiOutlineMeh size={32} className="text-red-600" />
                    ) : (
                        <AiOutlineMeh size={32} className="text-gray-400" />
                    )}
                </button>

            </div>
          
                <p className="text-sm text-gray-700 mt-4">
                    {article.helpful_yes} sim · {article.helpful_no} não
                </p>
            </div>

                {isAdmin ? (
                    <div className="flex gap-2">
                        <Link
                            href={route('articles.edit', article.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap text-center"
                        >
                            Editar
                        </Link>
                        <Link
                            href={route('articles.destroy', article.id)}
                            method="delete"
                            as="button"
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 whitespace-nowrap"
                            onClick={(e) => {
                                if (!confirm('Tem certeza que deseja deletar este artigo?')) {
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
