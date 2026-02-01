import { useEffect, useState, useRef } from "react";
import { HiEmojiHappy, HiPaperAirplane, HiDotsVertical } from "react-icons/hi";
import EmojiPicker from "emoji-picker-react";
import { Link, usePage } from "@inertiajs/react";

export default function Chat({ community }) {
    const currentUserId = usePage().props.auth.user.id;

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const getCsrfToken = () => {
        return (
            document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute("content") || ""
        );
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (!community) return;

        fetchMessages(community.id);
    }, [community]);

    const fetchMessages = async (communityId) => {
        try {
            const res = await fetch(`/messages?community_id=${communityId}`, {
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
            });

            if (!res.ok) return;

            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error("Erro ao buscar mensagens:", error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            const res = await fetch("/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": getCsrfToken(),
                },
                body: JSON.stringify({
                    community_id: community.id,
                    message: message.trim(),
                }),
            });

            if (!res.ok) return;

            const saved = await res.json();
            setMessages((prev) => [...prev, saved]);
            setMessage("");
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        }
    };

    const handleEmojiClick = (emojiData) => {
        setMessage((prev) => prev + emojiData.emoji);
    };

    if (!community) {
        return (
            <div className="flex flex-col justify-center items-center h-full text-gray-500 px-2 m-4 gap-4">
                <img
                    src="/images/woman-holding-flowers.svg"
                    className="w-full"
                />
                <p className="text-justify text-lg">
                    Entre em uma comunidade e compartilhe sua
                    experiência com outras mães.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col bg-gray-200 h-screen overflow-y-auto">
            <div className="flex items-center gap-3 border-b border-gray-300 p-4">

                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                        src="/images/community-default.jpg"
                        alt={community.nome}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                    {community.nome}
                </h2>

                <div className="ml-auto">
                    <Link href={route("communities.show", community.id)}>
                        <HiDotsVertical className="w-6 h-6" />
                    </Link>
                </div>
            </div>

            <div className="p-4 flex flex-col gap-2 overflow-y-auto h-[calc(100%-80px)]">
                {messages.map((msg) => {
                    const isOwn = msg.user_id === currentUserId;

                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isOwn ? "justify-end" : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[70%] p-3 rounded-lg shadow
                                    ${isOwn
                                        ? "bg-purple-500 text-white"
                                        : "bg-gray-100 text-gray-800"
                                    }`}
                            >

                                {!isOwn && (
                                    <span className="block text-xs font-semibold mb-1 text-grey-600">
                                        {msg.user?.name ??
                                            "Usuário"}
                                    </span>
                                )}

                                <p className="text-sm">
                                    {msg.message}
                                </p>

                                <p className="text-xs font-light flex justify-end mt-1">
                                    {new Date(
                                        msg.created_at
                                    ).toLocaleTimeString(
                                        [],
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    )}
                                </p>

                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <form
                onSubmit={sendMessage}
                className="flex items-center gap-2 p-4 border-t border-gray-300"
            >
                <div className="relative">
                    <HiEmojiHappy
                        className="h-7 w-7 cursor-pointer"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />

                    {showEmojiPicker && (
                        <div className="absolute bottom-10 left-0 z-50">
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg"
                    placeholder="Digite sua mensagem"
                />

                <button type="submit">
                    <HiPaperAirplane className="h-6 w-6 rotate-45" />
                </button>
            </form>
        </div>
    );
}