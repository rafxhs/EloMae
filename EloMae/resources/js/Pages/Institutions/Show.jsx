import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Show({ institution }) {
    return (
        <AuthenticatedLayout>
            <div className="max-w-4xl mx-auto py-6">
                

                    <div className="bg-white shadow-lg rounded-lg transition sm:rounded-lg p-6 flex-col items-center mb-6">
                        <h2 className="text-2xl font-bold">
                            {institution.name}
                        </h2> 
                        <span className='text-gray-600' >{institution.type}</span> <br />  

                        {institution.photo && (
                                <div>
                                    <img src={institution.photo} alt="Foto da instituição" className="mt-2 max-w-xs rounded-md" />
                                </div>
                            )}

                        <div className="mt-4 space-y-4 text-gray-700">
                            <p>
                                <strong>Endereço:</strong><br />
                                {institution.address}
                            </p>

                            <p>
                                <strong>Telefone:</strong><br /> {institution.phone}
                            </p>

                            <p>
                                <strong>Horário de Funcionamento:</strong><br /> {institution.opening_hours}
                            </p>
                            <p>
                                <strong>Serviços:</strong><br /> {institution.services}
                            </p>
                        </div>

                            <div className="pt-2">
                                <Link
                                    href={route("mapa")}
                                    className="inline-block px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold text-sm shadow hover:bg-purple-400 transition"
                                >
                                    Voltar para o mapa
                                </Link>
                            </div>
                        </div>
                    </div>
            
        </AuthenticatedLayout>
    );
}
