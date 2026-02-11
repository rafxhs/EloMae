import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo";
import {
    UsersIcon,
    BookOpenIcon,
    MapPinIcon,
} from '@heroicons/react/24/outline';

export default function Welcome({ auth, laravelVersion, phpVersion, articlePreview }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Bem-vinda" />
            <div className="bg-neutral-100 text-neutral-900">
                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="flex items-center justify-between py-6 px-6">
                            <div className="flex items-center">
                                <Link href="/images/EloMae-logo.png">
                                    <ApplicationLogo className="h-10 w-auto" />
                                </Link>
                            </div>

                            <nav className="flex gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                    >
                                        Home
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="w-[150px] h-[44px] px-4 py-2 rounded-lg border border-primary-500 text-primary-500 text-sm font-medium hover:bg-primary-50 transition"
                                        >
                                            <span className='flex items-center justify-center text-primary-500 text-lg'>Entrar</span>
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="w-[150px] h-[44px] px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-400 transition"
                                        >
                                            <span className='flex items-center justify-center text-white text-lg'>Cadastre-se</span>
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="">
                            <div className="mt-20 space-y-10 max-w-full mx-auto ">
                                <section className="relative h-[520px] rounded-2xl bg-primary-100 shadow-md overflow-hidden flex items-center">

                                    <div className='z-10 w-1/2 px-12 space-y-5'>
                                        <h1 className='text-3xl font-semibold text-primary-700'>
                                            Informação, apoio e acolhimento para mães
                                        </h1>

                                        <p className='text text-justify font-medium leading-relaxed'>
                                            O EloMãe é uma plataforma criada para apoiar mães
                                            com informações confiáveis, suporte emocional e acesso
                                            a redes de apoio perto de você.
                                        </p>

                                        <div className='pt-10'>

                                            <PrimaryButton>
                                                <Link
                                                    href={route("register")}
                                                    className="text-sm font-medium text-neutral-100 focus:outline-none"
                                                >
                                                    Comece Agora
                                                </Link>
                                            </PrimaryButton>
                                        </div>
                                    </div>

                                    <div className='absolute right-0 top-0 h-full w-1/2 flex justify-end'>
                                        <img
                                            src="/images/mae-com-bebe.png"
                                            alt="Mãe com bebê"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </section>

                                <section className="mt-20 space-y-10">
                                    <div className="text-center py-8 space-y-3">
                                        <h2 className="text-3xl font-semibold text-neutral-900">
                                            Todo suporte que você <span className='text-primary-700 font-extrabold'>Mãe</span> procura em um só lugar
                                        </h2>

                                        <p className="text-neutral-700 max-w-2xl mx-auto">
                                            O EloMãe foi criado para facilitar o acesso à informação e
                                            fortalecer redes de apoio emocial.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-white rounded-2xl p-8 shadow-sm text-center space-y-4">
                                            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-primary-100">
                                                <UsersIcon className="w-7 h-7 text-primary-600" />
                                            </div>
                                            <h3 className="font-semibold text-primary-700">
                                                Rede de Apoio
                                            </h3>

                                            <p className='text-sm text-justify text-neutral-600'>
                                                Encontre comunidades e compartilhe vivências com outras mães que passam por desafios
                                                semelhantes.
                                            </p>
                                        </div>

                                        <div className="bg-white rounded-2xl p-8 shadow-sm text-center space-y-4">
                                            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-primary-100">
                                                <BookOpenIcon className="w-7 h-7 text-primary-600" />
                                            </div>

                                            <h3 className="font-semibold text-primary-700">
                                                Aprendizado sobre a maternidade
                                            </h3>

                                            <p className='text-sm text-justify text-neutral-600'>
                                                Conteúdos confiáveis sobre maternidade, direitos e bem-estar.
                                            </p>
                                        </div>


                                        <div className="bg-white rounded-2xl p-8 shadow-sm text-center space-y-4">
                                            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-primary-100">
                                                <MapPinIcon className="w-7 h-7 text-primary-600" />
                                            </div>

                                            <h3 className="font-semibold text-primary-700">
                                                Pontos de apoio
                                            </h3>

                                            <p className='text-sm text-justify text-neutral-600'>
                                                Localize CRAS, ONGs, serviços públicos e redes de apoio perto
                                                de você.
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <section className="mt-20 space-y-10 max-w-full mx-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                                    <div className="space-y-5">
                                        <h2 className="text-3xl font-semibold text-neutral-900 py-4">
                                            Um espaço seguro para acolher e informar
                                        </h2>

                                        <p className="text-neutral-700 leading-relaxed text-justify">
                                            Sabemos que a maternidade pode trazer sobrecarga emocional,
                                            insegurança e solidão. Por isso, o EloMãe foi pensado como um
                                            ambiente seguro, respeitoso e acolhedor.
                                        </p>

                                        <p className="text-neutral-700 leading-relaxed text-justify">
                                            Aqui, você encontra informações confiáveis, troca de experiências
                                            com outras mães e acesso a recursos que ajudam a fortalecer
                                            sua autonomia e bem-estar emocional.
                                        </p>

                                        <PrimaryButton>
                                            <Link
                                                href={route('register')}
                                                className="text-sm font-medium text-white "
                                            >
                                                Quero fazer parte
                                            </Link>
                                        </PrimaryButton>
                                    </div>

                                    <div className="bg-primary-50 rounded-3xl pl-20 space-y-6">
                                        <div className="flex items-start gap-4">
                                            <span className="w-3 h-3 mt-2 rounded-full bg-primary-500" />
                                            <p className="text-neutral-700">
                                                Conteúdos pensados com responsabilidade emocional
                                            </p>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <span className="w-3 h-3 mt-2 rounded-full bg-primary-500" />
                                            <p className="text-neutral-700">
                                                Comunidades moderadas e respeitosas
                                            </p>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <span className="w-3 h-3 mt-2 rounded-full bg-primary-500" />
                                            <p className="text-neutral-700">
                                                Acesso facilitado a redes de apoio e serviços públicos
                                            </p>
                                        </div>
                                    </div>
                                </section>


                                {articlePreview && (
                                    <section className="mt-24 w-full space-y-8">

                                        <div className="text-center space-y-3 py-8">
                                            <h2 className="flex items-center justify-center text-3xl font-semibold text-neutral-900">
                                                Artigos
                                            </h2>

                                            <p className="text-neutral-700 max-w-xl mx-auto">
                                                Conteúdos informativos e acolhedores para apoiar mães solo
                                                em diferentes fases da maternidade.
                                            </p>
                                        </div>

                                        <div className="min-h-[200px] bg-white rounded-2xl p-8 shadow-sm">
                                            <h3 className="text-2xl font-semibold mb-4 text-neutral-800">
                                                {articlePreview.title}
                                            </h3>

                                            <div className="relative">
                                                <p className="text-neutral-700 leading-relaxed">
                                                    {articlePreview.summary
                                                        ? articlePreview.summary
                                                        : articlePreview.content
                                                            ?.replace(/<[^>]+>/g, '')
                                                            .slice(0, 350) + '...'}
                                                </p>

                                                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-neutral-100 to-transparent" />
                                            </div>

                                            <div className="flex flex-col items-center gap-2 py-8">
                                                <Link
                                                    href={route('login', { redirect: route('articles.show', articlePreview.id) })}
                                                    className="px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-400 transition"
                                                >
                                                    Leia mais
                                                </Link>

                                                <p className="text-sm text-neutral-600">
                                                    Faça login ou cadastre-se para continuar lendo
                                                </p>
                                            </div>
                                        </div>

                                    </section>
                                )}
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm text-black dark:text-white/70">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}
