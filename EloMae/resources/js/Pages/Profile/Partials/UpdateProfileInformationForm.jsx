import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user || {};

    // quando o backend inclui relação address, ela estará em user.address
    const existingAddress = user.address || {};

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name || '',
            email: user.email || '',
            birth_date: user.birth_date ? user.birth_date.substring(0, 10) : '',
            children_count: user.children_count ?? 0,
            government_beneficiary: !!user.government_beneficiary,
            address: {
                street: existingAddress.street || '',
                neighborhood: existingAddress.neighborhood || '',
                city: existingAddress.city || '',
                state: existingAddress.state || '',
                zip: existingAddress.zip || '',
            },
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                {/* Name */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
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

                {/* Birth date */}
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

                {/* Children count */}
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

                {/* Government beneficiary */}
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

                {/* Address group */}
                <fieldset className="mt-4 p-4 border rounded-md">
                    <legend className="text-sm font-medium text-gray-700">Endereço</legend>

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

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <InputLabel htmlFor="address.city" value="Cidade" />
                            <TextInput
                                id="address.city"
                                className="mt-1 block w-full"
                                value={data.address.city}
                                onChange={(e) => setData('address.city', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors['address.city']} />
                        </div>

                        <div>
                            <InputLabel htmlFor="address.state" value="Estado" />
                            <TextInput
                                id="address.state"
                                className="mt-1 block w-full"
                                value={data.address.state}
                                onChange={(e) => setData('address.state', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors['address.state']} />
                        </div>

                        <div>
                            <InputLabel htmlFor="address.zip" value="CEP (opcional)" />
                            <TextInput
                                id="address.zip"
                                className="mt-1 block w-full"
                                value={data.address.zip}
                                onChange={(e) => setData('address.zip', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors['address.zip']} />
                        </div>
                    </div>
                </fieldset>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
