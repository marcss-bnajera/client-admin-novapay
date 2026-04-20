import { useState } from "react";
import { AccountModal } from "./AccountModal";

export const Accounts = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-2 w-full min-h-screen">
            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a4b7c]">
                        Cuentas Bancarias
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Administra las cuentas de ahorro y monetarias
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    {/* Filtro de Actividad */}
                    <button className="flex items-center gap-2 px-4 py-2 border-2 border-[#CD9B67] text-[#CD9B67] rounded-lg font-bold hover:bg-[#CD9B67] hover:text-white transition">
                        🔥 Mayor Actividad
                    </button>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#CD9B67] hover:bg-[#b08554] px-5 py-2 rounded-lg text-white font-semibold transition-all shadow-md"
                    >
                        + Aperturar Cuenta
                    </button>
                </div>
            </div>

            {/* GRID DE CUENTAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* CARD DE EJEMPLO */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                No. 4509-2234-11
                            </span>
                            <span className="px-3 py-1 text-xs rounded-full bg-blue-50 text-[#1a4b7c] font-bold">
                                Monetaria
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-[#1a4b7c] mb-1">
                            Q 15,250.00
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">Saldo Disponible</p>

                        <div className="space-y-2 border-t pt-4">
                            <p className="text-sm text-gray-600"><strong>Titular:</strong> Juan Pérez</p>
                            <p className="text-sm text-gray-600"><strong>Estado:</strong>
                                <span className="ml-2 text-green-600 font-medium">Activa</span>
                            </p>
                        </div>

                        {/* ACCIONES */}
                        <div className="flex gap-3 mt-6">
                            <button className="flex-1 py-2 rounded-lg border border-[#1a4b7c] text-[#1a4b7c] font-medium hover:bg-[#1a4b7c] hover:text-white transition">
                                Editar
                            </button>
                            <button className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-600 hover:text-white transition">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {showModal && <AccountModal isOpen={showModal} onClose={() => setShowModal(false)} />}
        </div>
    );
};