import { useEffect, useState, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";

export default function CommunityDots() {
    const [hasUnread, setHasUnread] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const bellRef = useRef(null);

    /**
     * Fecha o dropdown ao clicar fora
     */
    useEffect(() => {
        function handleClickOutside(event) {
            if (bellRef.current && !bellRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /**
     * Abre / fecha dropdown
     */
    const toggleDropdown = async () => {
        const next = !open;
        setOpen(next);

        if (next) {
            await fetchOptions();
        }
    };

    /**
     * Inicial
     */
    useEffect(() => {
        fetchUnreadCount();
    }, []);

    return (
        <div className="relative" ref={bellRef}>
            {/* Dots */}
            <button
                onClick={toggleDropdown}
                className="relative focus:outline-none"
                title="Mais opções"
            >
                <HiDotsVertical className="w-6 h-6" />

                {hasUnread && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-96 rounded-md bg-white shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-2 border-b text-sm font-semibold text-gray-700">
                        Notificações
                    </div>


                </div>
            )}
        </div>
    );
} 
