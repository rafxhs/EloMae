import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { HiArrowRight, HiEmojiHappy, HiPaperAirplane, HiPlus, HiSearch } from 'react-icons/hi';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';

export default function Index() {
    const { auth, communities } = usePage().props;
    const user = auth?.user ?? null;

    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = (emojiObject) => {
        setMessage(prev => prev + emojiObject.emoji);
    };

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir esta comunidade?')) {
            Inertia.delete(route('communities.destroy', id));
        }
    };

    const fetchMessages = async (communityId) => {
        try {
            const response = await axios.get(route('messages.index', { community_id: communityId }));
            setMessages(response.data);
        } catch (error) {
            console.error('Erro ao carregar mensagens:', error);
        }
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || !selectedCommunity) return;

        try {
            const response = await axios.post(route('messages.store'), {
                community_id: selectedCommunity.id,
                message: message.trim(),
            });

            // Adicionar a nova mensagem ao estado
            setMessages(prev => [...prev, response.data]);
            setMessage('');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    return (
        <AuthenticatedLayout
            user={user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Comunidades</h2>}
        >

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
                                />
                            </div>
                        </div>

                        {communities && communities.length > 0 ? (
                            communities.map(({ id, nome }) => (
                                <div
                                    key={id}
                                    onClick={() => { setSelectedCommunity({ id, nome }); fetchMessages(id); }}
                                    className={`flex items-center gap-3 mx-3 px-2 py-3 rounded-lg cursor-pointer 
                                        ${selectedCommunity?.id === id ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                                >

                                    <div className='w-12 h-12 rounded-full overflow-hidden'>
                                        <img src='/images/community-default.jpg' alt={`Foto da comunidade ${nome}`} className='w-full h-full object-cover'></img>
                                    </div>

                                    <h2 className="text-lg font-semibold text-gray-800">{nome}</h2>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Nenhuma comunidade cadastrada ainda.</p>
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
                                        className="w-full pl-3 py-2  bg-gray-200 text-gray-700 text-sm rounded-lg border-none focus:outline-none focus:ring-0"
                                    />
                                    <button type='submit' className='flex items-center justify-center px-4 py-2  text-gray-500 hover:text-gray-400'>
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
