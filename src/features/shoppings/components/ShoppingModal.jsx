import { X, ShoppingCart, Tag, User, Calculator, AlertCircle, Check } from "lucide-react";

export const ShoppingModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="w-6 h-6" />
                        <h2 className="text-xl font-bold uppercase tracking-tight">Nueva Compra</h2>
                    </div>
                    <button onClick={onClose} className="hover:bg-black/20 p-1 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-5">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                            <User className="w-3 h-3" /> ID de Cuenta
                        </label>
                        <input 
                            type="number" 
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                            placeholder="Ingrese ID cuenta"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                            <Tag className="w-3 h-3" /> Producto
                        </label>
                        <select className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 appearance-none">
                            <option value="">Seleccione producto...</option>
                            <option value="1">Seguro de Vida</option>
                            <option value="2">Cuenta Oro</option>
                        </select>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-slate-400 flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-emerald-500" /> Subtotal estimado
                            </span>
                            <span className="text-white font-mono font-bold">Q0.00</span>
                        </div>
                        <div className="flex items-start gap-3 mt-4">
                            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                            <p className="text-[10px] text-slate-500 leading-tight">
                                El monto final será calculado basándose en el precio actual del producto en el catálogo.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-slate-800/50 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 text-slate-400 font-bold hover:text-white transition-colors">
                        Cancelar
                    </button>
                    <button className="flex-[2] bg-emerald-500 hover:bg-emerald-600 py-3 rounded-xl text-white font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                        <Check className="w-4 h-4" /> Finalizar
                    </button>
                </div>
            </div>
        </div>
    );
};