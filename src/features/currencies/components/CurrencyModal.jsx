import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCurrenciesStore } from "../store/currenciesStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { X, Coins, Type, Hash, TrendingUp, Save, RefreshCw } from "lucide-react";

export const CurrencyModal = ({ isOpen, onClose, currency, onSaved }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createCurrency, updateCurrency, loading } = useCurrenciesStore();

    useEffect(() => {
        if (isOpen) {
            if (currency) {
                reset({
                    currency: currency.currency || currency.nombre || "",
                    symbol: currency.symbol || currency.simbolo || "",
                    rate: currency.rate || currency.tasa || "",
                });
            } else {
                reset({ currency: "", symbol: "", rate: "" });
            }
        }
    }, [isOpen, currency, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            if (currency) {
                await updateCurrency(currency.id || currency._id, data);
                showSuccess("Divisa actualizada correctamente");
            } else {
                await createCurrency(data);
                showSuccess("Divisa creada correctamente");
            }
            onSaved?.();
            reset();
            onClose();
        } catch {
            showError("Error al guardar la divisa");
        }
    };

    const inputClass = "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40";
    const labelClass = "text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2";

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <Coins className="w-6 h-6" />
                        <h2 className="text-xl font-bold uppercase tracking-tight">
                            {currency ? "Editar Divisa" : "Configurar Divisa"}
                        </h2>
                    </div>
                    <button onClick={onClose} className="hover:bg-black/20 p-1 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-8 space-y-5">
                        <div className="space-y-2">
                            <label className={labelClass}><Type className="w-3 h-3" /> Nombre de la Moneda</label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Ej. Dólar Estadounidense"
                                {...register("currency", { required: "El nombre es obligatorio" })}
                            />
                            {errors.currency && <p className="text-red-400 text-xs mt-1">{errors.currency.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className={labelClass}><Hash className="w-3 h-3" /> Símbolo</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    placeholder="Ej. $"
                                    maxLength="3"
                                    {...register("symbol", {
                                        required: "El símbolo es obligatorio",
                                        maxLength: { value: 3, message: "Máximo 3 caracteres" },
                                    })}
                                />
                                {errors.symbol && <p className="text-red-400 text-xs mt-1">{errors.symbol.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className={labelClass}><TrendingUp className="w-3 h-3" /> Tasa (Rate)</label>
                                <input
                                    type="number"
                                    step="0.0001"
                                    className={inputClass}
                                    placeholder="1.0000"
                                    {...register("rate", {
                                        required: "La tasa es obligatoria",
                                        min: { value: 0.0001, message: "La tasa debe ser mayor a 0" },
                                    })}
                                />
                                {errors.rate && <p className="text-red-400 text-xs mt-1">{errors.rate.message}</p>}
                            </div>
                        </div>

                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                            <p className="text-[11px] text-slate-500 leading-relaxed italic text-center">
                                La tasa de cambio se utilizará para conversiones automáticas en transacciones internacionales.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-800/50 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-400 font-bold hover:text-white transition-colors">Cancelar</button>
                        <button type="submit" disabled={loading} className="flex-[2] bg-emerald-500 hover:bg-emerald-600 py-3 rounded-xl text-white font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Guardando...</> : <><Save className="w-4 h-4" /> {currency ? "Actualizar" : "Guardar Divisa"}</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
