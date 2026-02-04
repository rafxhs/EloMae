export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `w-full sm:h-[45px] items-center rounded-lg border border-transparent bg-primary-400 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-primary-300 focus:outline-none active:bg-primary-500 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
