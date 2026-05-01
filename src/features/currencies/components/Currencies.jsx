import { useState } from "react";
import { 
    Coins, 
    Search, 
    Plus, 
    Edit3, 
    Trash2, 
    TrendingUp, 
    Globe, 
    DollarSign 
} from "lucide-react";
import { CurrencyModal } from "./CurrencyModal";

export const Currencies = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);

    const currencies = [
        { id: 1, currency: "Quetzal", symbol: "Q", rate: 1.0000 },
        { id: 2, currency: "Dólar Estadounidense", symbol: "$", rate: 7.7500 },
        { id: 3, currency: "Euro", symbol: "€", rate: 8.4000 }
    ];

    const filteredCurrencies = currencies.filter(c =>
        c.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.symbol.includes(searchTerm)
    );

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
                        <button 
                            onClick={() => setShowModal(true)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                        >
                            <Plus className="w-5 h-5" /> Nueva Divisa
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCurrencies.map((c) => (
                        <div key={c.id} className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 text-2xl font-bold border border-emerald-500/20">
                                    {c.symbol}
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    {c.currency}
                                    <Globe className="w-4 h-4 text-slate-500" />
                                </h3>
                                <div className="flex items-center justify-between pt-4">
                                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                        Tasa de cambio
                                    </div>
                                    <span className="text-emerald-400 font-mono font-bold text-lg">
                                        {parseFloat(c.rate).toFixed(4)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && <CurrencyModal isOpen={showModal} onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
};