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
                <div className="fixed bottom-6 right-6 p-6 bg-primary-100 rounded-lg border border-primary-400 shadow-lg flex items-center justify-between gap-4 z-50">
                    <span className="font-medium text-md text-neutral-800">
                        Artigo removido dos favoritos
                    </span>
                    <button
                        onClick={undo}
                        className="px-4 h-[45px] text-white bg-primary-400 rounded-lg hover:bg-primary-300"
                    >
                        Desfazer
                    </button>
                </div>
            )}
        </>
    );
}
