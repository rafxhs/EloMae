import React, { useState, useMemo } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { HiPlus, HiSearch, HiEmojiHappy, HiPaperAirplane, HiMenu, HiDotsVertical } from 'react-icons/hi';
import EmojiPicker from 'emoji-picker-react';
import Modal from '@/Components/Modal';
import axios from 'axios';
import LinkButton from '@/Components/LinkButton';

export default function Index() {
    const { auth, communities } = usePage().props;
    const user = auth?.user ?? null;

    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [showJoinModal, setShowJoinModal] = useState(false);
    const [communityToJoin, setCommunityToJoin] = useState(null);

    const currentUserId = usePage().props.auth.user.id;

    const filteredCommunities = useMemo(() => {
        if (!searchQuery.trim()) {
            return communities;
        }

        const query = searchQuery.toLowerCase();
        return communities.filter(community => {
            const matchName = community.nome?.toLowerCase().includes(query);
            const matchTags = community.tags?.toLowerCase().includes(query);

            return matchName || matchTags;
        });
    }, [communities, searchQuery]);

    const getCsrfToken = () => {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    };

    const fetchMessages = async (communityId) => {
        if (!communityId) return setMessages([]);

        try {
            const res = await fetch(`/messages?community_id=${communityId}`, {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
            });

            if (!res.ok) {
                console.error('Erro ao buscar mensagens (status):', res.status);
                const text = await res.text();
                console.error('Response:', text);
                setMessages([]);
                return;
            }

            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || !selectedCommunity) return;

        try {
            const res = await fetch('/messages', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),
                },
                body: JSON.stringify({
                    community_id: selectedCommunity.id,
                    message: message.trim(),
                }),
            });

            if (!res.ok) {
                console.error('Erro ao enviar mensagem (status):', res.status);
                const text = await res.text();
                console.error('Response:', text);
                return;
            }

            const saved = await res.json();
            setMessages((prevMessages) => [...prevMessages, saved]);
            setMessage('');
            fetchMessages(selectedCommunity.id);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };


    const handleEmojiClick = (emojiData) => {
        setMessage((prevMessage) => prevMessage + emojiData.emoji);
    };

    const joinCommunity = async () => {
        if (!communityToJoin) return;

        try {
            await axios.post(`/communities/${communityToJoin.id}/join`);

            setShowJoinModal(false);
            communityToJoin.is_member = true;
            setSelectedCommunity(communityToJoin);
            fetchMessages(communityToJoin.id);

        } catch (error) {
            console.error("Erro ao entrar na comunidade:", error);
        }
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Comunidades</h2>}
        >
            <Head title="Comunidades" />

            <div className="max-w-7xl mx-auto">
                <div className='grid grid-cols-2'>
                    <aside className='flex flex-col border-r border-gray-300'>
                        <div className='py-4 px-4'>
                            <div className='flex flex-row justify-between pt-4'>
                                <h1 className='text-3xl font-bold text-gray-900'>Comunidades</h1>

                                {user && user.is_admin ? (
                                    <LinkButton
                                        href={route('communities.create')}
                                        className="mb-6"
                                        title="Criar nova comunidade"
                                    >
                                        <HiPlus className="h-6 w-6" />
                                    </LinkButton>
                                ) : null}
                            </div>
                            <div className='relative bg-gray-200 rounded-lg mt-4'>
                                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
                                <input
                                    type="text"
                                    placeholder="Pesquisar comunidade"
                                    className="pl-10 pr-3 py-2 w-full bg-gray-200 text-gray-700 text-sm rounded-lg border-gray-300 focus:outline-none focus:ring-0"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {filteredCommunities && filteredCommunities.length > 0 ? (
                            filteredCommunities.map((community) => (
                                <div
                                    key={community.id}
                                    onClick={() => {
                                        if (!community.is_member) {
                                            setCommunityToJoin(community);
                                            setShowJoinModal(true);
                                        } else {
                                            setSelectedCommunity(community);
                                            fetchMessages(community.id);
                                        }
                                    }}
                                    className={`flex items-center gap-3 mx-3 px-2 py-3 rounded-lg cursor-pointer
                                        ${selectedCommunity?.id === community.id ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                                >
                                    <div className='w-12 h-12 rounded-full overflow-hidden'>
                                        <img src='/images/community-default.jpg' alt={`Foto da comunidade ${community.nome}`} className='w-full h-full object-cover' />
                                    </div>

                                    <div className='flex flex-col mt-2'>
                                        <h2 className="text-lg font-semibold text-gray-800">{community.nome}</h2>
                                        <p className="text-xs text-gray-500">
                                            {community.members_count} membros
                                        </p>
                                    </div>
                                </div>
                            ))

                        ) : (
                            <div className="text-center text-gray-500 py-10 border hover:text-gray-500 rounded bg-white shadow flex flex-col items-center gap-4">
                                <HiSearch className="h-12 w-12 text-gray-400" />

                                <p>Ops!... Nenhuma comunidade encontrada para sua pesquisa.</p>
                                <p>Tente pesquisar um termo diferente.</p>

                                <LinkButton
                                    href={route("communities.index")}
                                >
                                    Limpar e voltar
                                </LinkButton>
                            </div>
                        )}

                    </aside>

                    <div className='flex flex-col bg-gray-200 flex-1 justify-between'>
                        {selectedCommunity ? (
                            <>
                                <div>
                                    <div className='flex items-center gap-3 border-b border-gray-300 p-4'>
                                        <div className='w-12 h-12 rounded-full overflow-hidden'>
                                            <img
                                                src="/images/community-default.jpg"
                                                alt={selectedCommunity.nome}
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {selectedCommunity.nome}
                                        </h2>

                                        <div className='ml-auto  cursor-pointer'>
                                            <Link href={route('communities.show', selectedCommunity.id)}>
                                                <HiDotsVertical className='w-6 h-6'></HiDotsVertical>
                                            </Link>
                                        </div>

                                    </div>
                                </div>

                                <div className="p-4 flex flex-col gap-2 overflow-y-auto h-[calc(100%-80px)]">
                                    {messages.map((msg) => {
                                        const isOwnMessage = msg.user_id === currentUserId;

                                        return (
                                            <div
                                                key={msg.id}
                                                className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`} >
                                                <div
                                                    className={` max-w-[70%] p-3 rounded-lg shadow
                                                                        ${isOwnMessage
                                                            ? "bg-purple-500 text-white rounded-br-none"
                                                            : "bg-gray-100 text-gray-800 rounded-bl-none"}`}
                                                >
                                                    {!isOwnMessage && (
                                                        <span className="block text-xs font-semibold mb-1 text-grey-600">
                                                            {msg.user?.name ?? "Usuário"}
                                                        </span>
                                                    )}

                                                    <p className="text-sm">{msg.message}</p>
                                                    <p className="text-xs flex justify-end mt-1">{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <form className='flex items-center gap-2 p-4 border-t border-gray-300 bg-gray-200 sticky bottom-0' onSubmit={sendMessage}>
                                    <div className='relative'>
                                        <HiEmojiHappy
                                            className="text-gray-500 hover:text-gray-400 h-7 w-7 cursor-pointer"
                                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                        />
                                        {showEmojiPicker && (
                                            <div className='absolute bottom-10 left-0 z-50'>
                                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Enviar mensagem"
                                        className="w-full pl-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg border-none focus:outline-none focus:ring-0"
                                    />
                                    <button type='submit' className='flex items-center justify-center px-4 py-2 text-gray-500 hover:text-gray-400'>
                                        <HiPaperAirplane className='h-6 w-6 rotate-45' />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className='flex flex-col justify-center items-center h-full text-gray-500 px-2 m-4 gap-4 absolute '>
                                <img src="/images/woman-holding-flowers.svg" className='w-full' />
                                <p className="text-justify text-lg">Entre em uma comunidade e compartilhe sua experiência com outras mães.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                show={showJoinModal}
                onClose={() => setShowJoinModal(false)}
                maxWidth="md"
            >
                <div className="p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Entrar na comunidade <span className="text-purple-600">"{communityToJoin?.nome}"</span>?
                    </h2>

                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-700 mb-1">Sobre a comunidade:</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {communityToJoin?.descricao ?? "Esta comunidade ainda não possui descrição."}
                        </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <p className="text-yellow-800 text-sm">
                            Você precisa entrar nesta comunidade para visualizar e enviar mensagens.
                        </p>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                            onClick={() => setShowJoinModal(false)}
                        >
                            Cancelar
                        </button>

                        <button
                            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
                            onClick={joinCommunity}
                        >
                            Entrar
                        </button>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
