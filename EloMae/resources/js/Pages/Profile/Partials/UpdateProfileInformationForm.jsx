import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user || {};
    const existingAddress = user.address || {};

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || '',
            email: user.email || '',
            birth_date: user.birth_date ? user.birth_date.substring(0, 10) : '',
            children_count: user.children_count ?? 0,
            government_beneficiary: !!user.government_beneficiary,
            address: {
                zip: existingAddress.zip || '',
                street: existingAddress.street || '',
                neighborhood: existingAddress.neighborhood || '',
                city: existingAddress.city || '',
                state: existingAddress.state || '',
            },
        });

    // estado local para controlar lookup do CEP
    const [cepLoading, setCepLoading] = useState(false);
    const [cepError, setCepError] = useState('');

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    // limpa e valida CEP (apenas números) e retorna string de 8 dígitos ou null
    const normalizeCep = (raw) => {
        if (!raw) return null;
        const digits = raw.replace(/\D/g, '');
        return digits.length === 8 ? digits : null;
    };

    // busca via ViaCEP e preenche campos
    const lookupCep = async () => {
        setCepError('');
        const normalized = normalizeCep(data.address.zip);
        if (!normalized) {
            setCepError('CEP inválido. Use 8 dígitos (ex: 57000000).');
            return;
        }

        setCepLoading(true);
        try {
            const res = await fetch(`https://viacep.com.br/ws/${normalized}/json/`);
            if (!res.ok) throw new Error('Erro na requisição do CEP');

            const json = await res.json();

            if (json.erro) {
                setCepError('CEP não encontrado.');
                setCepLoading(false);
                return;
            }

            // popular os campos retornados (logradouro, bairro, localidade, uf)
            setData('address.street', json.logradouro || '');
            setData('address.neighborhood', json.bairro || '');
            setData('address.city', json.localidade || '');
            setData('address.state', json.uf || '');
            setCepError('');
        } catch (err) {
            console.error('CEP lookup error', err);
            setCepError('Não foi possível buscar o CEP. Tente novamente.');
        } finally {
            setCepLoading(false);
        }
    };

    // permite pesquisar ao pressionar Enter no campo CEP
    const handleCepKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            lookupCep();
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Informações do Perfil</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Atualize seus dados pessoais e endereço.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Nome */}
                <div>
                    <InputLabel htmlFor="name" value="Nome" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {/* Data de nascimento */}
                <div>
                    <InputLabel htmlFor="birth_date" value="Data de nascimento" />
                    <input
                        id="birth_date"
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        value={data.birth_date}
                        onChange={(e) => setData('birth_date', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.birth_date} />
                </div>

                {/* Quantos filhos */}
                <div>
                    <InputLabel htmlFor="children_count" value="Quantos filhos" />
                    <input
                        id="children_count"
                        type="number"
                        min="0"
                        max="20"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        value={data.children_count}
                        onChange={(e) =>
                            setData('children_count', e.target.value !== '' ? parseInt(e.target.value, 10) : 0)
                        }
                    />
                    <InputError className="mt-2" message={errors.children_count} />
                </div>

                {/* Beneficiário governo */}
                <div className="flex items-start gap-3">
                    <div className="flex items-center h-5">
                        <input
                            id="government_beneficiary"
                            type="checkbox"
                            checked={data.government_beneficiary}
                            onChange={(e) => setData('government_beneficiary', e.target.checked)}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                        />
                    </div>
                    <div className="text-sm">
                        <label htmlFor="government_beneficiary" className="font-medium text-gray-700">
                            Beneficiário(a) de programa do governo?
                        </label>
                        <p className="text-gray-500">Marque se você recebe algum benefício governamental.</p>
                    </div>
                </div>
                <InputError className="mt-2" message={errors.government_beneficiary} />

                {/* === Endereço (CEP primeiro + lupa) === */}
                <fieldset className="mt-4 p-4 border rounded-md">
                    <legend className="text-sm font-medium text-gray-700">Endereço</legend>

                    {/* CEP + lupa */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-6 gap-3 items-end">
                        <div className="sm:col-span-2">
                            <InputLabel htmlFor="address.zip" value="CEP" />
                            <div className="relative">
                                <input
                                    id="address.zip"
                                    name="address.zip"
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="00000-000"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm pr-10"
                                    value={data.address.zip}
                                    onChange={(e) => {
                                        // permitir apenas dígitos e hífen na exibição (opcional)
                                        const cleaned = e.target.value.replace(/[^\d-]/g, '');
                                        setData('address.zip', cleaned);
                                    }}
                                    onKeyDown={handleCepKeyDown}
                                />

                                {/* botão lupa */}
                                <button
                                    type="button"
                                    onClick={lookupCep}
                                    disabled={cepLoading}
                                    title="Pesquisar CEP"
                                    className="absolute right-1 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-md px-2 py-1 text-sm font-medium border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    {cepLoading ? (
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <InputError className="mt-2" message={cepError || errors['address.zip']} />
                        </div>

                        {/* Cidade, Estado (preenchidos automaticamente) */}
                        <div className="sm:col-span-2">
                            <InputLabel htmlFor="address.city" value="Cidade" />
                            <TextInput
                                id="address.city"
                                className="mt-1 block w-full"
                                value={data.address.city}
                                onChange={(e) => setData('address.city', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors['address.city']} />
                        </div>

                        <div className="sm:col-span-2">
                            <InputLabel htmlFor="address.state" value="Estado" />
                            <TextInput
                                id="address.state"
                                className="mt-1 block w-full"
                                value={data.address.state}
                                onChange={(e) => setData('address.state', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors['address.state']} />
                        </div>
                    </div>

                    {/* Rua e Bairro (preenchidos automaticamente quando possível) */}
                    <div className="mt-3">
                        <InputLabel htmlFor="address.street" value="Nome da rua" />
                        <TextInput
                            id="address.street"
                            className="mt-1 block w-full"
                            value={data.address.street}
                            onChange={(e) => setData('address.street', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors['address.street']} />
                    </div>

                    <div className="mt-3">
                        <InputLabel htmlFor="address.neighborhood" value="Bairro" />
                        <TextInput
                            id="address.neighborhood"
                            className="mt-1 block w-full"
                            value={data.address.neighborhood}
                            onChange={(e) => setData('address.neighborhood', e.target.value)}
                        />
                        <InputError className="mt-2" message={errors['address.neighborhood']} />
                    </div>
                </fieldset>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Salvar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Salvo.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
