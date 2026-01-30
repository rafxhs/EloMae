import { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { HiUserCircle } from 'react-icons/hi';


export default function UpdateProfileInformationForm({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user || {};
    const existingAddress = user.address || {};
    const existingDependents = user.dependents || [];

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || '',
            email: user.email || '',
            birth_date: user.birth_date ? user.birth_date.substring(0, 10) : '',
            children_count: user.children_count ?? 0,
            government_beneficiary: !!user.government_beneficiary,
            // dependents é um array de objetos { name, birth_date, gender }
            dependents:
                existingDependents.length > 0
                    ? existingDependents.map((d) => ({
                        name: d.name || '',
                        birth_date: d.birth_date ? d.birth_date.substring(0, 10) : '',
                        gender: d.gender || '',
                    }))
                    : [],
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

    // Sincroniza o número de dependentes com children_count:
    // se children_count aumentar, adiciona objetos vazios; se diminuir, corta o array.
    useEffect(() => {
        const count = Number(data.children_count) || 0;
        const current = Array.isArray(data.dependents) ? data.dependents.slice() : [];
        if (current.length < count) {
            // adicionar dependentes vazios
            const toAdd = count - current.length;
            for (let i = 0; i < toAdd; i++) {
                current.push({ name: '', birth_date: '', gender: '' });
            }
            setData('dependents', current);
        } else if (current.length > count) {
            // remover excedentes
            current.length = count;
            setData('dependents', current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.children_count]); // só roda quando children_count muda

    const submit = (e) => {
        e.preventDefault();
        // Envia os dados para profile.update (rota existente)
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

    // Helpers para atualizar dependentes imutavelmente
    const updateDependentField = (index, field, value) => {
        const list = Array.isArray(data.dependents) ? [...data.dependents] : [];
        list[index] = { ...(list[index] || { name: '', birth_date: '', gender: '' }), [field]: value };
        setData('dependents', list);
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-semibold text-gray-900">Informações do seu perfil
                     <HiUserCircle className="ml-2 inline-block w-8 h-8" />
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Mantenha sempre seus dados atualizados para aproveitar melhor a plataforma.
                </p>
            </header>

            <form onSubmit={submit} className="text-lg space-y-6 mt-6 border border-gray-300 p-6 rounded">
                <legend className="text-lm">Dados do usuário</legend>
                {/* Nome */}
                <div className="mb-3 border-b pb-4 border-purple-300 ">
                    <div>
                        <InputLabel htmlFor="name" value="Nome" />
                        <TextInput
                            id="name"
                            className="mt-1 mb-4 block w-full"
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
                            className="mt-1 mb-4 block w-full"
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
                </div>

                <div className='border-b pb-4 border-purple-200'>
                    <legend className="text-lm">Informações complementares</legend>

                    {/* Beneficiário governo */}
                    <div className="flex items-start gap-3 mt-4 mb-4">
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

                    {/* Quantos filhos */}
                    <div className="mt-4">
                        <InputLabel htmlFor="children_count" value="Quantidade de filhos" />
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
                </div>


                {/* === Dependentes === */}
                <fieldset className="mt-6 p-4 border-b border-purple-300 ">
                    <legend className="text-sm font-medium text-gray-700">Filhos</legend>

                    {/* instrução */}
                    <p className="text-sm text-gray-500 mb-3">
                        Os campos abaixo serão gerados automaticamente conforme o número de filhos informado.
                    </p>

                    {Array.from({ length: Number(data.children_count) || 0 }).map((_, index) => (
                        <div key={index} className="mt-4 p-3 border rounded-md bg-gray-50">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-700">Filho {index + 1}</h3>
                                <p className="text-xs text-gray-500">Preencha nome, data de nascimento e sexo</p>
                            </div>

                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Nome */}
                                <div>
                                    <InputLabel htmlFor={`dependents.${index}.name`} value="Nome" />
                                    <TextInput
                                        id={`dependents.${index}.name`}
                                        className="mt-1 block w-full"
                                        value={(data.dependents?.[index]?.name) || ''}
                                        onChange={(e) => updateDependentField(index, 'name', e.target.value)}
                                    />
                                    <InputError className="mt-2" message={errors?.[`dependents.${index}.name`]} />
                                </div>

                                {/* Data de nascimento */}
                                <div>
                                    <InputLabel htmlFor={`dependents.${index}.birth_date`} value="Data de nascimento" />
                                    <input
                                        id={`dependents.${index}.birth_date`}
                                        type="date"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        max={new Date().toISOString().split('T')[0]}
                                        min={new Date(
                                            new Date().setFullYear(new Date().getFullYear() - 18)
                                        ).toISOString().split('T')[0]}
                                        value={(data.dependents?.[index]?.birth_date) || ''}
                                        onChange={(e) => updateDependentField(index, 'birth_date', e.target.value)}
                                    />

                                    <InputError className="mt-2" message={errors?.[`dependents.${index}.birth_date`]} />
                                </div>

                                {/* Sexo */}
                                <div>
                                    <InputLabel htmlFor={`dependents.${index}.gender`} value="Sexo" />
                                    <select
                                        id={`dependents.${index}.gender`}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        value={(data.dependents?.[index]?.gender) || ''}
                                        onChange={(e) => updateDependentField(index, 'gender', e.target.value)}
                                    >
                                        <option value="">Selecione</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="Feminino">Feminino</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                    <InputError className="mt-2" message={errors?.[`dependents.${index}.gender`]} />
                                </div>
                            </div>
                        </div>
                    ))}

                    {(!data.children_count || Number(data.children_count) === 0) && (
                        <p className="text-sm text-gray-500 mt-2">
                            Informe o número de filhos acima no campo "Quantidade de filhos" para preencher os dados.
                        </p>
                    )}
                </fieldset>

                {/* === Endereço (CEP primeiro + lupa) === */}
                <fieldset className="mt-4 p-4 border-b border-purple-300 rounded-md">
                    <legend className="text-lm ">Endereço</legend>

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


                <div className="flex items-center gap-4 center justify-center mt-6">
                    {/* <PrimaryButton disabled={processing}>Salvar</PrimaryButton> */}
                    <button
                            type='submit'
                            disabled={processing}
                            className="w-[300px] h-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {processing ? 'Salvando...' : 'Salvar'}
                     </button>

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
