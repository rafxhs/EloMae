import NavLink from '@/Components/NavLink';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, needsCompletion }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        {needsCompletion && (
                           <div className="flex items-center justify-between p-6 bg-pink-100 border border-pink-300">
                            <span>Complete seu cadastro para aproveitar melhor a plataforma!</span>
                            <NavLink href="/profile" className="p-10 text-white bg-pink-500 rounded-lg hover:bg-pink-700 hover:text-white">
                                Completar Cadastro
                            </NavLink>
                           </div>
                        )}
                    </div>
                    <div className="mt-4 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Elo Mãe
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
