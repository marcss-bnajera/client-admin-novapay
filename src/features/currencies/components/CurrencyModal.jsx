import { X, Coins, Type, Hash, TrendingUp, Save } from "lucide-react";

export const CurrencyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <Coins className="w-6 h-6" />
                        <h2 className="text-xl font-bold uppercase tracking-tight">Configurar Divisa</h2>
                    </div>
                    <button onClick={onClose} className="hover:bg-black/20 p-1 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                            <Type className="w-3 h-3" /> Nombre de la Moneda
                        </label>
                        <input 
                            type="text" 
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                            placeholder="Ej. Dólar Estadounidense"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                                <Hash className="w-3 h-3" /> Símbolo
                            </label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                                placeholder="Ej. $"
                                maxLength="3"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp className="w-3 h-3" /> Tasa (Rate)
                            </label>
                            <input 
                                type="number" 
                                step="0.0001"
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                                placeholder="1.0000"
                            />
                        </div>
                    </div>

                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                        <p className="text-[11px] text-slate-500 leading-relaxed italic text-center">
                            La tasa de cambio se utilizará para conversiones automáticas en transacciones internacionales.
                        </p>
                    </div>
                </div>

                <div className="p-6 bg-slate-800/50 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 text-slate-400 font-bold hover:text-white transition-colors">
                        Cancelar
                    </button>
                    <button className="flex-[2] bg-emerald-500 hover:bg-emerald-600 py-3 rounded-xl text-white font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" /> Guardar Divisa
                    </button>
                </div>
            </div>
        </div>
    );
};