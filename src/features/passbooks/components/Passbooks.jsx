import { useState, useEffect } from "react";
import { PassbookModal } from "./PassbookModal";
import { usePassbooksStore } from "../store/passbooksStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { Search, PlusCircle, BookOpen, Calendar, Hash, CheckCircle, FileText, Trash2, RefreshCw } from "lucide-react";

export const Passbooks = () => {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { passbooks, loading, getPassbooks, deletePassbook } = usePassbooksStore();

    useEffect(() => {
        getPassbooks();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta libreta?")) return;
        try {
            await deletePassbook(id);
            showSuccess("Libreta eliminada correctamente");
        } catch {
            showError("Error al eliminar la libreta");
        }
    };

    const filteredPassbooks = passbooks.filter((pb) => {
        const term = searchTerm.toLowerCase();
        const numLibreta = pb.numero_libreta || "";
        const numCuenta = pb.account?.numero_cuenta || "";
        return numLibreta.includes(term) || numCuenta.includes(term);
    });

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Libretas</h1>
                        <p className="text-slate-400 text-sm">Control de registros físicos y digitales de cuentas</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar por libreta o cuenta..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all w-full sm:w-64"
                            />
                        </div>
                        <button onClick={() => setShowModal(true)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-5 py-2.5 rounded-xl text-white font-semibold transition-all shadow-lg shadow-emerald-500/30">
                            <PlusCircle className="w-5 h-5" /> Nueva Libreta
                        </button>
                        <button onClick={getPassbooks} disabled={loading} className="p-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-emerald-400 transition-all">
                            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* TABLA */}
                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-700/30 text-slate-400 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold flex items-center gap-2"><BookOpen className="w-4 h-4" /> Número Libreta</th>
                                    <th className="px-6 py-4 font-semibold"><div className="flex items-center gap-2"><Hash className="w-4 h-4" /> Número Cuenta</div></th>
                                    <th className="px-6 py-4 font-semibold"><div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Emisión</div></th>
                                    <th className="px-6 py-4 font-semibold text-center"><div className="flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" /> Estado</div></th>
                                    <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {loading && filteredPassbooks.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" /> Cargando libretas...
                                        </td>
                                    </tr>
                                ) : filteredPassbooks.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500 italic">No se encontraron libretas.</td>
                                    </tr>
                                ) : filteredPassbooks.map((pb) => (
                                    <tr key={pb.id} className="group hover:bg-slate-700/20 transition-colors">
                                        {/* Número de Libreta */}
                                        <td className="px-6 py-4">
                                            <span className="text-white font-mono text-sm font-medium">
                                                {pb.numero_libreta}
                                            </span>
                                        </td>

                                        {/* Número de Cuenta (desde la relación) */}
                                        <td className="px-6 py-4 text-slate-400 font-mono">
                                            {pb.account?.numero_cuenta || "Sin asignar"}
                                        </td>

                                        {/* Fecha de Emisión formateada */}
                                        <td className="px-6 py-4 text-slate-300 text-sm">
                                            {pb.fecha_emision ? new Date(pb.fecha_emision).toLocaleDateString() : "—"}
                                        </td>

                                        {/* Estado */}
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold border uppercase ${pb.estado === 'ACTIVA'
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                                }`}>
                                                {pb.estado}
                                            </span>
                                        </td>

                                        {/* Acciones */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 transition-all" title="Ver detalles">
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(pb.id)}
                                                    className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all"
                                                    title="Eliminar"
                                                >
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

                {showModal && (
                    <PassbookModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onSaved={getPassbooks}
                    />
                )}
            </div>
        </div>
    );
};
