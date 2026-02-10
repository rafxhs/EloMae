import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Head } from "@inertiajs/react";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import Search from "@/Components/Search";
import { Link } from "@inertiajs/react";
import LinkButton from "@/Components/LinkButton";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

export default function Mapa() {
    const [filtro, setFiltro] = useState("Todos");
    const [locais, setLocais] = useState([]);
    const [pos, setPos] = useState(null);

    useEffect(() => {
        fetch("/api/institutions")
            .then((res) => res.json())
            .then((data) => setLocais(data))
            .catch(() => alert("Erro ao carregar locais"));
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (location) => {
                    setPos([
                        location.coords.latitude,
                        location.coords.longitude,
                    ]);
                },
                () => {
                    alert("Não foi possível obter sua localização");
                }
            );
        }
    }, []);

    const locaisFiltrados =
        filtro === "Todos" ? locais : locais.filter((l) => l.type === filtro);

    if (!pos) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Mapa Locais de Apoio
                    </h2>
                }
            >
                <Head title="Mapa" />
                <div className="flex items-center justify-center h-[500px] w-full">
                    <span>Obtendo sua localização...</span>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Mapa" />
            <div className="flex items-center justify-center h-full bg-transparent p-4">
                <Search filtro={filtro} setFiltro={setFiltro} />
            </div>

            <MapContainer
                center={pos}
                zoom={13}
                className="h-screen w-full rounded-lg shadow-lg z-0"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap"
                />
                <CircleMarker center={pos} radius={30} color="purple">
                    <Marker position={pos}>
                        <Popup>Você está aqui</Popup>
                    </Marker>
                </CircleMarker>

                {/* Markers das seeders */}
                {locaisFiltrados.map((inst) => (
                    <Marker key={inst.id} position={[inst.lat, inst.lng]}>
                        <Popup>
                            <strong className="text-sm">{inst.name}</strong>
                            <br />
                            {inst.address}

                            <div className="pt-2">
                                <LinkButton
                                    href={`/institutions/${inst.id}`}
                                    className="w-full"
                                >
                                    Ver detalhes
                                </LinkButton>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </AuthenticatedLayout>
    );
}
