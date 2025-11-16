import React, { useState, useMemo } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { HiPlus, HiSearch, HiEmojiHappy, HiPaperAirplane } from 'react-icons/hi';
import EmojiPicker from 'emoji-picker-react';

export default function Index() {
    const { auth, communities } = usePage().props;
    const user = auth?.user ?? null;

    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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

    // Função para buscar mensagens 
    const fetchMessages = async (communityId) => {
        try {
            const response = await fetch(`/api/communities/${communityId}/messages`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Erro ao buscar mensagens:', error);
        }
    };

    // Função para enviar mensagem
    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || !selectedCommunity) return;

        try {
            await fetch(`/api/communities/${selectedCommunity.id}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });
            setMessage('');
            fetchMessages(selectedCommunity.id);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    const handleEmojiClick = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji);
        setShowEmojiPicker(false);
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
                                <h1 className='text-xl font-bold text-gray-950'>Comunidades</h1>

                                {user && user.is_admin ? (
                                    <Link
                                        href={route('communities.create')}
                                        className="flex items-center justify-center h-8 w-8 bg-purple-500 text-white rounded-lg hover:bg-purple-400"
                                        title="Criar nova comunidade"
                                    >
                                        <HiPlus className="h-6 w-6" />
                                    </Link>
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
                            filteredCommunities.map(({ id, nome, tags }) => (
                                <div
                                    key={id}
                                    onClick={() => {
                                        setSelectedCommunity({ id, nome, tags });
                                        fetchMessages(id);
                                    }}
                                    className={`flex items-center gap-3 mx-3 px-2 py-3 rounded-lg cursor-pointer 
                                        ${selectedCommunity?.id === id ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                                >

                                    <div className='w-12 h-12 rounded-full overflow-hidden'>
                                        <img src='/images/community-default.jpg' alt={`Foto da comunidade ${nome}`} className='w-full h-full object-cover' />
                                    </div>
                                    
                                    <div className='flex flex-col'>
                                        <h2 className="text-lg font-semibold text-gray-800">{nome}</h2>
                                        <p className='text-xs text-gray-500'>{tags}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 p-4">Nenhuma comunidade encontrada.</p>
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
                                        <Link href={route('communities.show', selectedCommunity.id)}>
                                            <h2 className="text-lg font-semibold text-gray-800">
                                                {selectedCommunity.nome}
                                            </h2>
                                        </Link>
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col gap-2 overflow-y-auto h-[calc(100%-80px)]">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className="flex flex-col">
                                            <span className="font-semibold text-gray-800">{msg.user?.name ?? 'Usuário'}</span>
                                            <p className="text-gray-700">{msg.message}</p>
                                        </div>
                                    ))}
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

                            <div className='flex flex-col justify-center items-center h-full text-gray-500 px-8 m-8 gap-4'>
                                <img src="/images/woman-holding-flowers.svg" className='w-full' />
                                <p className="text-justify text-lg">Entre em uma comunidade e compartilhe sua experiência com outras mães.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
