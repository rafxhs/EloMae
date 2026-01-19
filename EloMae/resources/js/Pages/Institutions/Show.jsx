import LinkButton from '@/Components/LinkButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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

                    <div >
                        {institution.photo && (
                        <img
                            src={institution.photo}
                            alt="Foto da instituição"
                            className="mt-2 rounded-lg border border-gray-200 shadow-lg w-full max-w-md"
                        />
                        )}
                    </div>

                    <div className="mt-6 space-y-4 text-sm text-gray-700">
                        <div>
                            <p className="font-semibold text-gray-900">Endereço</p>
                            <p className="leading-relaxed">{institution.address}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-gray-900">Telefone</p>
                            <p>{institution.phone}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-gray-900">Horário de Funcionamento</p>
                            <p>{institution.opening_hours}</p>
                        </div>

                        <div>
                            <p className="font-semibold text-gray-900">Serviços</p>
                            <p className="leading-relaxed">{institution.services}</p>
                        </div>
                    </div>

                    <div className="pt-2 mt-4">
                        <LinkButton
                            href={route("mapa")}
                        >
                            Voltar para o mapa
                        </LinkButton>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
