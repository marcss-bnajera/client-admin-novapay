import { useState, useEffect } from "react";
import { Coins, Search, Plus, Edit3, Trash2, TrendingUp, Globe, RefreshCw } from "lucide-react";
import { CurrencyModal } from "./CurrencyModal";
import { useCurrenciesStore } from "../store/currenciesStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const Currencies = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(null);

    const { currencies, loading, getCurrencies, deleteCurrency } = useCurrenciesStore();

    useEffect(() => {
        getCurrencies();
    }, []);

    const handleEdit = (currency) => {
        setSelectedCurrency(currency);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta divisa?")) return;
        try {
            await deleteCurrency(id);
            showSuccess("Divisa eliminada correctamente");
        } catch {
            showError("Error al eliminar la divisa");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCurrency(null);
    };

    const filteredCurrencies = currencies.filter((c) => {
        const term = searchTerm.toLowerCase();
        return (
            (c.currency || c.nombre || "").toLowerCase().includes(term) ||
            (c.symbol || c.simbolo || "").includes(term)
        );
    });

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <Coins className="text-emerald-400 w-8 h-8" />
                            Gestión de Divisas
                        </h1>
                        <p className="text-slate-400 text-sm">Configuración de tipos de cambio y símbolos monetarios</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar divisa..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white w-64 focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                            />
                        </div>
                        <button onClick={() => { setSelectedCurrency(null); setShowModal(true); }} className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                            <Plus className="w-5 h-5" /> Nueva Divisa
                        </button>
                        <button onClick={getCurrencies} disabled={loading} className="p-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-emerald-400 transition-all">
                            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                {loading && filteredCurrencies.length === 0 ? (
                    <div className="flex items-center justify-center py-20 text-slate-500">
                        <RefreshCw className="w-8 h-8 animate-spin text-emerald-500 mr-3" />
                        Cargando divisas...
                    </div>
                ) : filteredCurrencies.length === 0 ? (
                    <div className="text-center py-20 text-slate-500 italic">No se encontraron divisas.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCurrencies.map((c, index) => (
                            <div
                                key={c.id || c._id || `${c.currency}-${index}`}
                                className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 text-2xl font-bold border border-emerald-500/20">
                                        {c.symbol || c.simbolo}
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(c)} className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(c.id || c._id)} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        {c.currency || c.nombre}
                                        <Globe className="w-4 h-4 text-slate-500" />
                                    </h3>
                                    <div className="flex items-center justify-between pt-4">
                                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                                            Tasa de cambio
                                        </div>
                                        <span className="text-emerald-400 font-mono font-bold text-lg">
                                            {parseFloat(c.rate || c.tasa || 0).toFixed(4)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {showModal && <CurrencyModal isOpen={showModal} onClose={handleCloseModal} currency={selectedCurrency} onSaved={getCurrencies} />}
            </div>
        </div>
    );
};
