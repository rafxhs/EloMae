// resources/js/Pages/Mapa.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// importar imagens para que o bundler resolva o caminho
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// reset / configurar o ícone padrão (snippet padrão usado em muitos exemplos)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function Mapa() {
  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Mapa com Leaflet</h1>

      <MapContainer
        center={[-8.0476, -34.8770]}
        zoom={13}
        className="h-[500px] w-full rounded-lg shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />

        <Marker position={[-8.0476, -34.8770]}>
          <Popup>Você está aqui! 🌍</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
