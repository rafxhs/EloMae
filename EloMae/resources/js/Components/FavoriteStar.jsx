import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function FavoriteStar({
    articleId,
    initialValue,
    enableUndo = false,
}) {
    const [favorited, setFavorited] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const [showUndo, setShowUndo] = useState(false);

    function toggleFavorite() {
        if (loading) return;

        const wasFavorited = favorited;

        setLoading(true);
        setFavorited(!favorited);

        router.post(
            route("articles.favorite", articleId),
            {},
            {
                preserveScroll: true,
                preserveState: true,
                only: [],
                onSuccess: () => {
                    if (wasFavorited && enableUndo) {
                        setShowUndo(true);
                    }
                },
                onFinish: () => setLoading(false),
            }
        );
    }

    function undo() {
        setShowUndo(false);
        setFavorited(true);

        router.post(
            route("articles.favorite", articleId),
            {},
            {
                preserveScroll: true,
                preserveState: true,
                only: [],
            }
        );
    }

    useEffect(() => {
        if (!showUndo) return;

        const timer = setTimeout(() => {
            setShowUndo(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [showUndo]);

    return (
        <>
            <button
                onClick={toggleFavorite}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2 rounded transition ${
                    favorited
                        ? "bg-white text-yellow-400 hover:bg-yellow-100"
                        : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                }`}
                title={
                    favorited
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                }
            >
                {favorited ? <FaStar size={18} /> : <FaRegStar size={18} />}
            </button>

            {showUndo && (
                <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50">
                    <span>Artigo removido dos favoritos</span>
                    <button
                        onClick={undo}
                        className="font-semibold underline hover:text-yellow-400"
                    >
                        Desfazer
                    </button>
                </div>
            )}
        </>
    );
}
