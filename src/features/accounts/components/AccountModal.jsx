export const AccountModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* HEADER */}
                <div className="p-5 text-white bg-gradient-to-r from-[#1a4b7c] to-[#2563eb]">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">Nueva Cuenta</h2>
                            <p className="text-xs opacity-80 uppercase font-semibold text-[#CD9B67]">
                                Apertura de producto financiero
                            </p>
                        </div>
                        <button onClick={onClose} className="text-white hover:text-[#CD9B67] transition text-2xl">×</button>
                    </div>
                </div>

                {/* FORMULARIO */}
                <div className="p-6 space-y-5">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1">Buscar Usuario (Titular)</label>
                        <select className="input-style">
                            <option value="">Seleccione al cliente</option>
                            <option value="1">Juan Pérez - 1234 5678 0101</option>
                            <option value="2">Marcos Beteta - 1934 1234 0101</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Tipo de Cuenta</label>
                            <select className="input-style">
                                <option value="monetaria">Monetaria</option>
                                <option value="ahorro">Ahorro</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Saldo Inicial</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500 font-bold">Q</span>
                                <input type="number" className="input-style pl-8" placeholder="0.00" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1">Número de Cuenta Sugerido</label>
                        <input
                            type="text"
                            disabled
                            className="input-style bg-gray-100 cursor-not-allowed font-mono"
                            value="GENERADO-AUTOMATICAMENTE"
                        />
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs text-blue-800 leading-relaxed">
                            <strong>Nota:</strong> Al aperturar una cuenta, se generará un registro de actividad inicial. Asegúrese de que el DPI del cliente esté verificado.
                        </p>
                    </div>
                </div>

                {/* ACCIONES */}
                <div className="p-5 bg-gray-50 flex justify-end gap-3 border-t">
                    <button onClick={onClose} className="px-6 py-2 text-gray-600 font-semibold hover:bg-gray-200 rounded-lg transition">
                        Cancelar
                    </button>
                    <button className="px-8 py-2 bg-[#1a4b7c] text-white font-bold rounded-lg hover:bg-[#153a61] shadow-lg transition-all">
                        Crear Cuenta
                    </button>
                </div>
            </div>

            <style jsx>{`
                .input-style {
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.5rem;
                    border: 2px solid #e5e7eb;
                    transition: all 0.2s;
                }
                .input-style:focus {
                    outline: none;
                    border-color: #CD9B67;
                    background-color: white;
                    box-shadow: 0 0 0 3px rgba(205, 155, 103, 0.2);
                }
            `}</style>
        </div>
    );
};