import React from 'react';
import { Link } from '@inertiajs/react';
import clsx from 'clsx';

export default function LinkButton({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={clsx(
                'inline-block px-4 py-2 rounded-lg bg-primary-600 !text-white text-center font-semibold text-sm shadow',
                'hover:bg-purple-400 transition',
                active
                    ? 'border-indigo-400'
                    : 'border-transparent hover:border-gray-300',
                className
    )}
        >
            {children}
        </Link>
    );
}