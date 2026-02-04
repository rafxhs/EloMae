import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthOnboarding from "@/Components/AuthOnboarding";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div class="w-full max-w-5xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                <AuthOnboarding />

                <section className="p-8 md:p-16">

                    <h2 className="text-2xl font-medium py-4">Cadastre-se</h2>


                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4 flex flex-col justify-center">
                            <PrimaryButton className="" disabled={processing}>
                                Cadastrar
                            </PrimaryButton>

                            <div className="flex items-center justify-end my-4 gap-1">
                                <span className="font-medium text-sm text-neutral-800">
                                    Já tem uma conta?
                                </span>

                                <Link
                                    href={route('login')}
                                    className="text-sm font-medium text-primary-400 hover:text-primary-300 focus:outline-none"
                                >
                                    Entrar
                                </Link>
                            </div>

                        </div>
                    </form>
                    <div className="flex items-center justify-center space-x-4 mt-5">
                        <hr className="flex-grow text-neutral-300" />
                        <span className="font-secondary text-neutral-400 text-base">
                            ou
                        </span>
                        <hr className="flex-grow text-neutral-200" />
                    </div>

                    <div className="mt-5 space-y-4">
                        <a href="/auth/google">
                            <button className="w-full h-[45px] flex flex-row gap-4 items-center justify-center border border-primary-700 font-primary font-medium text-sm text-primary-1000 py-2 rounded-md shadow-md hover:border-primary-400 hover:border-1.5 focus:border-primary-700 focus:border-2 transition duration-200">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/256/2875/2875404.png"
                                    alt="Google logo"
                                    className="w-5 h-auto"
                                />
                                Continuar com o Google
                            </button>
                        </a>
                    </div>
                </section>
            </div>

        </GuestLayout>
    );
}
