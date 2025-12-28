import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import Search from "@/Components/Search"; // ✅ novo componente

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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          setPos([location.coords.latitude, location.coords.longitude]);
        },
        () => {
          alert("Não foi possível obter sua localização");
        }
      );
    }
  }, []);

  const locaisFiltrados =
    filtro === "Todos" ? locais : locais.filter((l) => l.tipo === filtro);

  if (!pos) {
    return (
      <AuthenticatedLayout
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Mapa Locais de Apoio
          </h2>
        }
      >
        <div className="flex items-center justify-center h-[500px] w-full">
          <span>Obtendo sua localização...</span>
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      
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
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        <Marker position={pos}>
          <Popup>Você está aqui</Popup>
        </Marker>
        {/* <Marker position={[inst.lat, inst.lng]}>
        <Popup>
          <strong>{inst.name}</strong><br />
          {inst.address}<br />

          <a href={`/institutions/${inst.id}`}>
            Ver detalhes
          </a>
        </Popup>
      </Marker> */}
      </MapContainer>
    </AuthenticatedLayout>
  );
}
