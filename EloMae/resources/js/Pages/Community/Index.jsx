import React, { useState, useMemo } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { HiPlus, HiSearch } from "react-icons/hi";
import JoinCommunityModal from "@/Components/Community/JoinCommunityModal";
import axios from "axios";
import LinkButton from "@/Components/LinkButton";
import Chat from "@/Components/Community/Chat";
import { useEffect, useRef } from "react";


export default function Index() {
    const { props, url } = usePage();
    const { auth, communities: initialCommunities } = props;
    const user = auth?.user ?? null;

    const [communities, setCommunities] = useState(initialCommunities);
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [showJoinModal, setShowJoinModal] = useState(false);
    const [communityToJoin, setCommunityToJoin] = useState(null);

    const query = new URLSearchParams(url.split("?")[1]);
    const openCommunityId = query.get("open");
    const hasOpenedFromUrl = useRef(false);

    const filteredCommunities = useMemo(() => {
        let list = communities;

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            list = communities.filter((community) => {
                const matchName = community.nome?.toLowerCase().includes(query);
                const matchTags = community.tags?.toLowerCase().includes(query);

                return matchName || matchTags;
            });
        }

        return [...list].sort((a, b) => {
            if (a.is_member === b.is_member) return 0;
            return a.is_member ? -1 : 1;
        });
    }, [communities, searchQuery]);


    const joinCommunity = async () => {
        if (!communityToJoin) return;

        try {
            await axios.post(`/communities/${communityToJoin.id}/join`);

            setShowJoinModal(false);

            setCommunities((prev) =>
                prev.map((c) =>
                    c.id === communityToJoin.id
                        ? { ...c, is_member: true, unread_count: 0 }
                        : c
                )
            );

            setSelectedCommunity({
                ...communityToJoin,
                is_member: true,
                unread_count: 0,
            });
        } catch (error) {
            console.error("Erro ao entrar na comunidade:", error);
        }
    };

    useEffect(() => {
        if (hasOpenedFromUrl.current) return;
        if (!openCommunityId || !communities.length) return;

        const community = communities.find(
            (c) => c.id === Number(openCommunityId)
        );

        if (!community) return;

        hasOpenedFromUrl.current = true;

        if (!community.is_member) {
            setCommunityToJoin(community);
            setShowJoinModal(true);
            return;
        }

        setSelectedCommunity({
            ...community,
            unread_count: 0,
        });

        setCommunities((prev) =>
            prev.map((c) =>
                c.id === community.id
                    ? { ...c, unread_count: 0 }
                    : c
            )
        );
    }, [openCommunityId, communities]);


    return (
        <AuthenticatedLayout
            user={user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Comunidades
                </h2>
            }
        >
            <Head title="Comunidades" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2">
                    <aside className=" border-r border-gray-300 h-screen overflow-y-auto">
                        <div className="py-4 px-4">
                            <div className="flex flex-row justify-between pt-4">
                                <h1 className="text-3xl font-extrabold text-primary-700">
                                    Comunidades
                                </h1>

                                {user && user.is_admin ? (
                                    <LinkButton
                                        href={route("communities.create")}
                                        className="mb-6"
                                        title="Criar nova comunidade"
                                    >
                                        <HiPlus className="h-6 w-6" />
                                    </LinkButton>
                                ) : null}
                            </div>
                            <div className="relative bg-gray-200 rounded-lg mt-4">
                                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-6 w-6" />
                                <input
                                    type="text"
                                    placeholder="Pesquisar comunidade"
                                    className="pl-10 pr-3 py-2 w-full bg-gray-200 text-gray-700 text-sm rounded-lg border-gray-300 focus:outline-none focus:ring-0"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        {filteredCommunities &&
                            filteredCommunities.length > 0 ? (
                            filteredCommunities.map((community) => (
                                <div
                                    key={community.id}
                                    onClick={() => {
                                        if (!community.is_member) {
                                            setCommunityToJoin(community);
                                            setShowJoinModal(true);
                                        } else {
                                            setSelectedCommunity({
                                                ...community,
                                                unread_count: 0,
                                            });
                                            setCommunities((prev) =>
                                                prev.map((c) =>
                                                    c.id === community.id
                                                        ? {
                                                            ...c,
                                                            unread_count: 0,
                                                        }
                                                        : c
                                                )
                                            );
                                        }
                                    }}
                                    className={`flex items-center mx-3 px-2 py-3 rounded-lg cursor-pointer
                                    ${community.is_member ? 'bg-white hover:bg-gray-200 mb-2 border border-gray-300' : 'bg-gray-100 border border-gray-300 hover:bg-gray-200 mb-2'}
                                    ${selectedCommunity?.id === community.id ? 'ring-2 ring-purple-400' : ''}`}
                                >
                                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                                        <img
                                            src="/images/community-default.jpg"
                                            alt={`Foto da comunidade ${community.nome}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col flex-1">
                                        <h2 className="text-lg font-semibold text-gray-800">
                                            {community.nome}
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            {community.members_count} membros
                                        </p>
                                    </div>

                                    {community.is_member ? (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mr-2">
                                            Participa
                                        </span>
                                    ) : (
                                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full mr-2">
                                            Não participa
                                        </span>
                                    )}

                                    {community.unread_count > 0 && (
                                        <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                                            {community.unread_count}
                                        </span>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-500 py-10 border hover:text-gray-500 rounded bg-white shadow flex flex-col items-center gap-4">
                                <HiSearch className="h-12 w-12 text-gray-400" />
                                <p>
                                    Nenhuma comunidade encontrada para
                                    sua pesquisa.
                                </p>
                                <p>Tente pesquisar um termo diferente.</p>
                                <LinkButton href={route("communities.index")}>
                                    Limpar e voltar
                                </LinkButton>
                            </div>
                        )}
                    </aside>
                    <Chat community={selectedCommunity} />
                </div>
            </div>

            <JoinCommunityModal
                show={showJoinModal}
                community={communityToJoin}
                onClose={() => setShowJoinModal(false)}
                onConfirm={joinCommunity}
            />

        </AuthenticatedLayout>
    );
}
