import Modal from "@/Components/Modal";

export default function JoinCommunityModal({
    show,
    onClose,
    community,
    onConfirm,
}) {
    if (!community) return null;

    return (
        <Modal show={show} onClose={onClose} maxWidth="md">
            <div className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    Entrar na comunidade{" "}
                    <span className="text-purple-600">
                        "{community.nome}"
                    </span>
                    ?
                </h2>

                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-1">
                        Sobre a comunidade:
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {community.descricao ??
                            "Esta comunidade ainda não possui descrição."}
                    </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                        Você precisa entrar nesta comunidade para visualizar
                        e enviar mensagens.
                    </p>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700"
                        onClick={onConfirm}
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
