import { useState } from "react";
import { UserModal } from "./UserModal";
import { Search, UserPlus, Edit, Trash2, Mail, IdCard, Briefcase, MoreVertical } from "lucide-react";

export const Users = () => {
    const [showModal, setShowModal] = useState(false);

    const users = [
        {
            id: 1,
            name: "Juan Pérez",
            username: "@jperez_2024",
            dpi: "1234 56789 0101",
            email: "juan.perez@mail.com",
            role: "Cliente Individual",
            status: "Activo"
        },
        {
            id: 2,
            name: "Marcos Beteta",
            username: "@mbeteta_2024",
            dpi: "1994 12345 0101",
            email: "marcos.beteta@mail.com",
            role: "Cliente Individual",
            status: "Activo"
        }
    ];

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Gestión de Usuarios</h1>
                        <p className="text-slate-400 text-sm">Visualiza y administra los clientes de NovaPay</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar usuario..."
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all w-full sm:w-64"
                            />
                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-5 py-2.5 rounded-xl text-white font-semibold transition-all shadow-lg shadow-emerald-500/30"
                        >
                            <UserPlus className="w-5 h-5" />
                            Nuevo Usuario
                        </button>
                    </div>
                </div>

                {/* LISTA DE USUARIOS (TABLA) */}
                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-700/30 text-slate-400 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Usuario</th>
                                    <th className="px-6 py-4 font-semibold">Identificación</th>
                                    <th className="px-6 py-4 font-semibold">Contacto</th>
                                    <th className="px-6 py-4 font-semibold">Rol</th>
                                    <th className="px-6 py-4 font-semibold">Estado</th>
                                    <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {users.map((user) => (
                                    <tr key={user.id} className="group hover:bg-slate-700/20 transition-colors">
                                        {/* NOMBRE Y USERNAME */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium text-sm">{user.name}</p>
                                                    <p className="text-slate-500 text-xs">{user.username}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* DPI */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <IdCard className="w-4 h-4 text-slate-500" />
                                                <span className="text-sm font-mono">{user.dpi}</span>
                                            </div>
                                        </td>

                                        {/* EMAIL */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <Mail className="w-4 h-4 text-slate-500" />
                                                <span className="text-sm">{user.email}</span>
                                            </div>
                                        </td>

                                        {/* ROL */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <Briefcase className="w-4 h-4 text-slate-500" />
                                                <span className="text-sm">{user.role}</span>
                                            </div>
                                        </td>

                                        {/* ESTADO */}
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                                                {user.status}
                                            </span>
                                        </td>

                                        {/* ACCIONES */}
                                        <td className="px-6 py-4 text-right text-sm">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 rounded-lg hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all" title="Editar">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all" title="Eliminar">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {showModal && <UserModal isOpen={showModal} onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
};