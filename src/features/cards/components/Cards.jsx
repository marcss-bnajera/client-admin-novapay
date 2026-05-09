import { useState, useEffect } from "react";
import { CardModal } from "./CardModal";
import { useCardsStore } from "../store/cardsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { Search, PlusCircle, CreditCard, Calendar, Trash2, Eye, RefreshCw } from "lucide-react";

export const Cards = () => {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { cards, loading, getCards, deleteCard } = useCardsStore();

    useEffect(() => {
        getCards();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de cancelar esta tarjeta?")) return;
        try {
            await deleteCard(id);
            showSuccess("Tarjeta cancelada correctamente");
        } catch {
            showError("Error al cancelar la tarjeta");
        }
    };

    const filteredCards = cards.filter((c) => {
        const term = searchTerm.toLowerCase();
        const num = c.numero_tarjeta || "";
        const cuenta = c.account?.numero_cuenta || String(c.account_id || "");
        return num.includes(term) || cuenta.includes(term);
    });

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Tarjetas</h1>
                        <p className="text-slate-400 text-sm">Administra las tarjetas vinculadas a las cuentas de NovaPay</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar tarjeta..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all w-full sm:w-64"
                            />
                        </div>
                        <button onClick={() => setShowModal(true)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-5 py-2.5 rounded-xl text-white font-semibold transition-all shadow-lg shadow-emerald-500/30">
                            <PlusCircle className="w-5 h-5" /> Emitir Tarjeta
                        </button>
                        <button onClick={getCards} disabled={loading} className="p-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-emerald-400 transition-all">
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
                                    <th className="px-6 py-4 font-semibold">Tarjeta</th>
                                    <th className="px-6 py-4 font-semibold text-center">CVV</th>
                                    <th className="px-6 py-4 font-semibold">Expiración</th>
                                    <th className="px-6 py-4 font-semibold">No. Cuenta</th>
                                    <th className="px-6 py-4 font-semibold text-center">Estado</th>
                                    <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {loading && filteredCards.length === 0 ? (
                                    <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" /> Cargando tarjetas...
                                    </td></tr>
                                ) : filteredCards.length === 0 ? (
                                    <tr><td colSpan="6" className="px-6 py-12 text-center text-slate-500 italic">No se encontraron tarjetas.</td></tr>
                                ) : filteredCards.map((card) => (
                                    <tr key={card.id || card._id} className="group hover:bg-slate-700/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-7 rounded bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center border border-slate-500/30">
                                                    <CreditCard className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                <span className="text-white font-mono text-sm tracking-wider">
                                                    **** **** **** {(card.numero_tarjeta || card.cardNumber || "0000").slice(-4)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-slate-400 font-mono text-sm">***</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <Calendar className="w-4 h-4 text-slate-500" />
                                                <span className="text-sm font-mono">{card.fecha_expiracion || card.expiryDate || "—"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-slate-400 font-mono">{card.account?.numero_cuenta || card.account_id}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold border ${
                                                (card.estado || card.status) === "ACTIVA" || (card.estado || card.status) === "ACTIVE"
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                            }`}>
                                                {card.estado || card.status || "ACTIVA"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 rounded-lg hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all" title="Ver detalles">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(card.id || card._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all" title="Cancelar">
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

                {showModal && <CardModal isOpen={showModal} onClose={() => setShowModal(false)} onSaved={getCards} />}
            </div>
        </div>
    );
};
