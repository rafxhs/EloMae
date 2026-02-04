import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthOnboarding from "@/Components/AuthOnboarding";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Entrar - EloMae" />

            <div class="w-full max-w-5xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

                <AuthOnboarding />

                <section className="p-8 md:p-16">

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    <h2 className="text-2xl font-medium py-4">Entrar</h2>

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData("email", e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Senha" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData("password", e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="mt-4 block ">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <div className="flex items-center justify- py-4">
                                    <span className="ms-2 text-sm text-gray-600">
                                        Lembrar-me
                                    </span>
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Esqueceu a senha?
                                        </Link>
                                    )}

                                </div>
                            </label>
                        </div>
                        <div className="mt-4 flex flex-col justify-center">
                            <PrimaryButton className="" disabled={processing}>
                                Entrar
                            </PrimaryButton>
                            
                            <div className="flex items-center justify-end my-4 gap-1">
                                <span className="font-medium text-sm text-neutral-800">
                                    Não tem uma conta?
                                </span>

                                <Link
                                    href={route("register")}
                                    className="text-sm font-medium text-primary-400 hover:text-primary-300 focus:outline-none"
                                >
                                    Registre-se
                                </Link>
                            </div>

                        </div>
                    </form>

                    <div className="flex items-center justify-center py-4 space-x-4 mt-5">
                        <hr className="flex-grow text-neutral-300" />
                        <span className="font-secondary text-neutral-500 text-base">
                            ou
                        </span>
                        <hr className="flex-grow text-neutral-200" />
                    </div>

                    <div className="mt-5 space-y-4">
                        <a href="/auth/google">
                            <button className="w-full h-[45px] flex flex-row gap-4 items-center justify-center border border-primary-600 font-primary font-medium text-sm text-primary-1000 py-2 rounded-md shadow-md hover:border-primary-300 hover:border-1.5 focus:border-primary-700 focus:border-2 transition duration-200">
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
