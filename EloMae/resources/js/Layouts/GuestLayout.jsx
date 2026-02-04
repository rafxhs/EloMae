import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 sm:justify-center sm:pt-0">
            <div className="mt-6 w-full min-h-[600px] overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-4xl  sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}
