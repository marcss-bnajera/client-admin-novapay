import { useState, useEffect } from "react";
import { ShoppingBag, Search, XCircle, CheckCircle2, Calendar, CreditCard, Plus, ArrowUpRight, RefreshCw } from "lucide-react";
import { ShoppingModal } from "./ShoppingModal";
import { useShoppingsStore } from "../store/shoppingsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const Shopping = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);

    const { shoppings, loading, getShoppings, deleteShopping } = useShoppingsStore();

    useEffect(() => {
        getShoppings();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de cancelar esta compra?")) return;
        try {
            await deleteShopping(id);
            showSuccess("Compra cancelada correctamente");
        } catch {
            showError("Error al cancelar la compra");
        }
    };

    const filteredShoppings = shoppings.filter((s) => {
        const term = searchTerm.toLowerCase();
        const cuenta = s.account?.numero_cuenta || String(s.cuenta_id || "");
        const producto = s.product?.name || s.product_name || `${s.producto_id}`;
        return cuenta.includes(term) || producto.toLowerCase().includes(term);
    });

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <ShoppingBag className="text-emerald-400 w-8 h-8" />
                            Registro de Compras
                        </h1>
                        <p className="text-slate-400 text-sm">Gestión de adquisiciones NovaPay</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white w-64 focus:ring-2 focus:ring-emerald-500/50 outline-none"
                            />
                        </div>
                        <button onClick={() => setShowModal(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                            <Plus className="w-5 h-5" /> Nueva Compra
                        </button>
                        <button onClick={getShoppings} disabled={loading} className="p-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-emerald-400 transition-all">
                            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-700/30 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Cliente / Producto</th>
                                <th className="px-6 py-4 text-center">Monto</th>
                                <th className="px-6 py-4 text-center">Estado</th>
                                <th className="px-6 py-4"><div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Fecha</div></th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {loading && filteredShoppings.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" /> Cargando compras...
                                </td></tr>
                            ) : filteredShoppings.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-500 italic">No se encontraron compras.</td></tr>
                            ) : filteredShoppings.map((item) => (
                                <tr key={item.id || item._id} className="group hover:bg-slate-700/20 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">#{item.id || item._id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 text-white font-semibold">
                                                <CreditCard className="w-4 h-4 text-emerald-500" />
                                                {item.account?.numero_cuenta || `ACC-${item.cuenta_id}`}
                                            </div>
                                            <div className="flex items-center gap-1 text-[11px] text-slate-400 ml-6">
                                                <ArrowUpRight className="w-3 h-3 text-slate-500" />
                                                {item.product?.name || `Producto #${item.producto_id}`}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-white font-mono">Q{parseFloat(item.monto || item.amount || 0).toFixed(2)}</td>
                                    <td className="px-6 py-4 text-center">
                                        {(item.estado || item.status) === "COMPLETADO" || (item.estado || item.status) === "COMPLETED" ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                                <CheckCircle2 className="w-3 h-3" /> {item.estado || item.status}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border bg-rose-500/10 text-rose-400 border-rose-500/20">
                                                <XCircle className="w-3 h-3" /> {item.estado || item.status}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-400">{new Date(item.fecha || item.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(item.id || item._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all" title="Cancelar">
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && <ShoppingModal isOpen={showModal} onClose={() => setShowModal(false)} onSaved={getShoppings} />}
            </div>
        </div>
    );
};
