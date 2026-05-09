import { useForm } from "react-hook-form";
import { useShoppingsStore } from "../store/shoppingsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { X, ShoppingCart, Tag, User, AlertCircle, Check, RefreshCw } from "lucide-react";

export const ShoppingModal = ({ isOpen, onClose, onSaved }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createShopping, loading } = useShoppingsStore();

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            await createShopping(data);
            showSuccess("Compra registrada correctamente");
            onSaved?.();
            reset();
            onClose();
        } catch {
            showError("Error al registrar la compra");
        }
    };

    const inputClass = "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40";

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <ShoppingCart className="w-6 h-6" />
                        <h2 className="text-xl font-bold uppercase tracking-tight">Nueva Compra</h2>
                    </div>
                    <button onClick={onClose} className="hover:bg-black/20 p-1 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-8 space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                                <User className="w-3 h-3" /> Número de Cuenta
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Ej. 1234567890"
                                {...register("numero_cuenta", { required: "El número de cuenta es obligatorio" })}
                            />
                            {errors.numero_cuenta && <p className="text-red-400 text-xs mt-1">{errors.numero_cuenta.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                                <Tag className="w-3 h-3" /> ID de Producto
                            </label>
                            <input
                                type="number"
                                className={inputClass}
                                placeholder="ID del producto"
                                {...register("producto_id", { required: "El producto es obligatorio" })}
                            />
                            {errors.producto_id && <p className="text-red-400 text-xs mt-1">{errors.producto_id.message}</p>}
                        </div>

                        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                                <p className="text-[10px] text-slate-500 leading-tight">
                                    El monto final será calculado basándose en el precio actual del producto en el catálogo.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-800/50 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-400 font-bold hover:text-white transition-colors">Cancelar</button>
                        <button type="submit" disabled={loading} className="flex-[2] bg-emerald-500 hover:bg-emerald-600 py-3 rounded-xl text-white font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Procesando...</> : <><Check className="w-4 h-4" /> Finalizar</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
