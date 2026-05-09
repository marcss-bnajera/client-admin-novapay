import { useForm } from "react-hook-form";
import { useCardsStore } from "../store/cardsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { X, CreditCard, ShieldCheck, Info, RefreshCw } from "lucide-react";

export const CardModal = ({ isOpen, onClose, onSaved }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createCard, loading } = useCardsStore();

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            await createCard(data);
            showSuccess("Tarjeta emitida correctamente");
            onSaved?.();
            reset();
            onClose();
        } catch {
            showError("Error al emitir la tarjeta");
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all";

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden border border-slate-700/50">

                {/* HEADER */}
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 relative overflow-hidden">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                Nueva Tarjeta
                            </h2>
                            <p className="text-sm text-emerald-100 mt-1">Emisión de tarjeta de débito NovaPay</p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 space-y-5">

                        {/* Estructura visual de la tarjeta */}
                        <div className="p-4 bg-slate-900/60 border border-slate-700/50 rounded-xl space-y-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Estructura del número (16 dígitos)
                            </p>
                            <div className="flex items-center gap-1 font-mono text-xs">
                                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-1 rounded-lg">490001</span>
                                <span className="text-slate-500">+</span>
                                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-1 rounded-lg">XXXXXXXXX</span>
                                <span className="text-slate-500">+</span>
                                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-1 rounded-lg">D</span>
                            </div>
                            <div className="flex items-start gap-1 font-mono text-[9px] text-slate-500">
                                <span className="w-[56px] text-blue-400">Emisor (6)</span>
                                <span className="w-2" />
                                <span className="w-[80px] text-purple-400">No. Cuenta (9)</span>
                                <span className="w-2" />
                                <span className="text-amber-400">Luhn (1)</span>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <CreditCard className="w-3.5 h-3.5" /> Número de Cuenta
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Ej. 1234567890 (10 dígitos)"
                                {...register("numero_cuenta", { required: "El número de cuenta es obligatorio" })}
                            />
                            {errors.numero_cuenta && <p className="text-red-400 text-xs mt-1">{errors.numero_cuenta.message}</p>}
                        </div>

                        <div className="flex gap-3 p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl">
                            <Info className="w-5 h-5 text-slate-400 shrink-0" />
                            <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-semibold">
                                El número de tarjeta, CVV y fecha de expiración se generan automáticamente. La tarjeta queda en estado ACTIVA.
                            </p>
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="p-6 bg-slate-900/50 border-t border-slate-700/50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-slate-300 font-semibold hover:bg-slate-700/50 rounded-xl transition-all">Cancelar</button>
                        <button type="submit" disabled={loading} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 disabled:opacity-70">
                            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Procesando...</> : "Emitir Tarjeta"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
