import { useEffect, useState, useRef } from "react";
import { HiBell } from "react-icons/hi";

export default function NotificationBell() {
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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /**
     * Busca quantidade de não lidas
     */
    const fetchUnreadCount = async () => {
        const response = await fetch("/notifications/unread-count", {
            credentials: "include",
            headers: {
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        if (response.ok) {
            const data = await response.json();
            setHasUnread(data.unread > 0);
        }
    };

    /**
     * Busca notificações completas
     */
    const fetchNotifications = async () => {
        const response = await fetch("/notifications/data", {
            credentials: "include",
            headers: {
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        if (response.ok) {
            const data = await response.json();
            setNotifications(data);
        }
    };

    /**
     * Ao abrir o dropdown
     */
    const toggleDropdown = async () => {
        const next = !open;
        setOpen(next);

        if (next) {
            await fetchNotifications();
        }
    };

    /**
     * Marca como lida
     */
    const markAsRead = async (id) => {
        await fetch(`/notifications/${id}/read`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
        });

        setNotifications((prev) =>
            prev.map((n) =>
                n.id === id ? { ...n, read_at: new Date() } : n
            )
        );

        fetchUnreadCount();
    };

    /**
     * Inicial
     */
    useEffect(() => {
        fetchUnreadCount();
    }, []);

    return (
        <div className="relative" ref={bellRef}>
            {/* Bell */}
            <button
                onClick={toggleDropdown}
                className="relative focus:outline-none"
                title="Notificações"
            >
                <HiBell className="h-6 w-6 text-gray-600 hover:text-gray-800 transition-colors" />

                {hasUnread && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-80 rounded-md bg-white shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-2 border-b text-sm font-semibold text-gray-700">
                        Notificações
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 && (
                            <div className="px-4 py-4 text-sm text-gray-500">
                                Nenhuma notificação.
                            </div>
                        )}

                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                onClick={() => markAsRead(notification.id)}
                                className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 ${
                                    notification.read_at
                                        ? "text-gray-500"
                                        : "bg-purple-50 text-gray-800"
                                }`}
                            >
                                <div className="font-medium">
                                    {notification.data.title}
                                </div>
                                <div className="text-xs mt-1">
                                    {notification.data.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
