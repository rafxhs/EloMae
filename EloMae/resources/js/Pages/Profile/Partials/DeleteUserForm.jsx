import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`text-lg space-y-6 mt-6 border border-gray-300 p-6 rounded ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Apagar Conta
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Após a exclusão da sua conta, todos os seus recursos e dados
                    serão apagados permanentemente. Antes de excluir sua conta,
                    faça o download de quaisquer dados ou informações que você deseje
                    manter.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Apagar Conta
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                       Tem certeza de que deseja excluir sua conta?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Após a exclusão da sua conta, todos os seus recursos e
                        dados serão apagados permanentemente. Digite sua
                        senha para confirmar que deseja excluir permanentemente
                        sua conta.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="senha"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            cancelar
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Apagar Conta
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
