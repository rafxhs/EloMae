import React from "react";

const termos = [
  "Todos",
  "CREAS",
  "CRAS",
  "Educação",
  "Delegacia",
  "Prefeitura",
  "Saúde",
  "Secretaria",
  "ONG",
];

export default function Search({ filtro, setFiltro }) {
  return (
    <select
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
      className="border-gray-300 p-2 mb-4 z-10 rounded-lg shadow-lg w-full max-w-md"
    >
      {termos.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
