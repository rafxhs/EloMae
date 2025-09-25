import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function Mapa() {
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

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
              Mapa Locais de Apoio
        </h2>
        }>

        <MapContainer
          center={pos || [-8.0476, -34.8770]} // fallback Recife
          zoom={13}
          className="h-[500px] w-full rounded-lg shadow-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />

          {pos && (
            <Marker position={pos}>
              <Popup>Você está aqui</Popup>
            </Marker>
          )}
        </MapContainer>
    </AuthenticatedLayout>
  );
}
