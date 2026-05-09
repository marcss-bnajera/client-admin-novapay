import { useState, useEffect } from "react";
import { UserModal } from "./UserModal";
import { useUsersStore } from "../store/usersStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { Search, UserPlus, Edit, Trash2, Mail, IdCard, Briefcase, RefreshCw } from "lucide-react";

export const Users = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const { users, loading, getUsers, deleteUser } = useUsersStore();

    useEffect(() => {
        getUsers();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
        try {
            await deleteUser(id);
            showSuccess("Usuario eliminado correctamente");
        } catch {
            showError("Error al eliminar usuario");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const filteredUsers = users.filter((u) => {
        const term = searchTerm.toLowerCase();
        return (
            u.nombre?.toLowerCase().includes(term) ||
            u.apellido?.toLowerCase().includes(term) ||
            u.username?.toLowerCase().includes(term) ||
            u.email?.toLowerCase().includes(term) ||
            String(u.id || "").includes(term)
        );
    });

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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all w-full sm:w-64"
                            />
                        </div>

                        <button
                            onClick={() => { setSelectedUser(null); setShowModal(true); }}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-5 py-2.5 rounded-xl text-white font-semibold transition-all shadow-lg shadow-emerald-500/30"
                        >
                            <UserPlus className="w-5 h-5" />
                            Nuevo Usuario
                        </button>

                        <button
                            onClick={getUsers}
                            disabled={loading}
                            className="p-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-emerald-400 transition-all"
                            title="Recargar"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* LISTA DE USUARIOS (TABLA) */}
                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-700/30 text-slate-400 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">ID</th>
                                    <th className="px-6 py-4 font-semibold">Usuario</th>
                                    <th className="px-6 py-4 font-semibold">DPI</th>
                                    <th className="px-6 py-4 font-semibold">Contacto</th>
                                    <th className="px-6 py-4 font-semibold">Rol</th>
                                    <th className="px-6 py-4 font-semibold">Estado</th>
                                    <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {loading && filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" />
                                            Cargando usuarios...
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-slate-500 italic">
                                            No se encontraron usuarios.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="group hover:bg-slate-700/20 transition-colors">
                                            {/* ID */}
                                            <td className="px-6 py-4">
                                                <span className="text-emerald-400 font-mono font-bold text-sm bg-emerald-500/10 px-2 py-1 rounded-lg">
                                                    #{user.id}
                                                </span>
                                            </td>

                                            {/* NOMBRE Y USERNAME */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/20">
                                                        {(user.nombre || user.username || "?").charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium text-sm">
                                                            {user.nombre} {user.apellido}
                                                        </p>
                                                        <p className="text-slate-500 text-xs">@{user.username}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* DPI */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <IdCard className="w-4 h-4 text-slate-500" />
                                                    <span className="text-sm font-mono">{user.dpi || "—"}</span>
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
                                                    <span className="text-sm">{user.role?.name || user.Role?.name || "—"}</span>
                                                </div>
                                            </td>

                                            {/* ESTADO */}
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold border ${
                                                    user.active !== false
                                                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                        : "bg-red-500/10 text-red-400 border-red-500/20"
                                                }`}>
                                                    {user.active !== false ? "Activo" : "Inactivo"}
                                                </span>
                                            </td>

                                            {/* ACCIONES */}
                                            <td className="px-6 py-4 text-right text-sm">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(user)}
                                                        className="p-2 rounded-lg hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all"
                                                        title="Editar"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all"
                                                        title="Eliminar"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {showModal && (
                    <UserModal
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        user={selectedUser}
                        onSaved={getUsers}
                    />
                )}
            </div>
        </div>
    );
};
