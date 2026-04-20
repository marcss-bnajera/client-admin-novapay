import { useState } from "react";
import { UserModal } from "./UserModal";

export const Users = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1a4b7c]">
                        Gestión de Usuarios
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Visualiza y administra los clientes de NovaPay
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    {/* BARRA DE BÚSQUEDA */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar usuario..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CD9B67] w-full"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">
                            🔍
                        </span>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-[#CD9B67] hover:bg-[#b08554] px-5 py-2 rounded-lg text-white font-semibold transition-all shadow-md"
                    >
                        + Nuevo Usuario
                    </button>
                </div>
            </div>

            {/* GRID DE USUARIOS */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* CARD DE EJEMPLO */}
                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="p-5">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-[#1a4b7c]">Juan Pérez</h2>
                                <p className="text-sm text-gray-500">@jperez_2024</p>
                            </div>
                            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-bold">
                                Activo
                            </span>
                        </div>

                        <div className="mt-4 space-y-2">
                            <p className="text-sm text-gray-600"><strong>DPI:</strong> 1234 56789 0101</p>
                            <p className="text-sm text-gray-600"><strong>Email:</strong> juan.perez@mail.com</p>
                            <p className="text-sm text-gray-600"><strong>Rol:</strong> Cliente Individual</p>
                        </div>

                        {/* ACCIONES */}
                        <div className="flex gap-3 mt-6 border-t pt-4">
                            <button className="flex-1 py-2 rounded-lg border border-[#1a4b7c] text-[#1a4b7c] font-medium hover:bg-[#1a4b7c] hover:text-white transition">
                                Editar
                            </button>
                            <button className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-600 hover:text-white transition">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
                    <div className="p-5">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-[#1a4b7c]">Marcos Beteta</h2>
                                <p className="text-sm text-gray-500">@mbeteta_2024</p>
                            </div>
                            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-bold">
                                Activo
                            </span>
                        </div>

                        <div className="mt-4 space-y-2">
                            <p className="text-sm text-gray-600"><strong>DPI:</strong> 1994 12345 0101</p>
                            <p className="text-sm text-gray-600"><strong>Email:</strong> marcos.beteta@mail.com</p>
                            <p className="text-sm text-gray-600"><strong>Rol:</strong> Cliente Individual</p>
                        </div>

                        {/* ACCIONES */}
                        <div className="flex gap-3 mt-6 border-t pt-4">
                            <button className="flex-1 py-2 rounded-lg border border-[#1a4b7c] text-[#1a4b7c] font-medium hover:bg-[#1a4b7c] hover:text-white transition">
                                Editar
                            </button>
                            <button className="flex-1 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-600 hover:text-white transition">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {showModal && <UserModal isOpen={showModal} onClose={() => setShowModal(false)} />}
        </div>
    );
};