import { useForm } from "react-hook-form";
import { useDepositsStore } from "../store/depositsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { X, ArrowDownCircle, CreditCard, DollarSign, AlertCircle, RefreshCw } from "lucide-react";

export const DepositModal = ({ isOpen, onClose, onSaved }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createDeposit, loading } = useDepositsStore();

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            await createDeposit(data);
            showSuccess("Depósito registrado correctamente");
            onSaved?.();
            reset();
            onClose();
        } catch {
            showError("Error al registrar el depósito");
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all";

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden border border-slate-700/50">

                {/* HEADER */}
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <ArrowDownCircle className="w-6 h-6 text-white" />
                                </div>
                                Nuevo Depósito
                            </h2>
                            <p className="text-sm text-emerald-100 mt-1">Acreditar fondos a cuenta de NovaPay</p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 space-y-5">
                        <div className="flex gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                            <AlertCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                            <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                                Asegúrese de verificar el número de cuenta antes de procesar.
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <CreditCard className="w-3.5 h-3.5" /> Número de Cuenta
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Ej. 1234567890"
                                {...register("numero_cuenta", { required: "El número de cuenta es obligatorio" })}
                            />
                            {errors.numero_cuenta && <p className="text-red-400 text-xs mt-1">{errors.numero_cuenta.message}</p>}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <DollarSign className="w-3.5 h-3.5" /> Monto
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Q</span>
                                <input
                                    type="number"
                                    className={`${inputClass} pl-10`}
                                    placeholder="0.00"
                                    step="0.01"
                                    {...register("monto", {
                                        required: "El monto es obligatorio",
                                        min: { value: 0.01, message: "El monto debe ser mayor a 0" },
                                    })}
                                />
                            </div>
                            {errors.monto && <p className="text-red-400 text-xs mt-1">{errors.monto.message}</p>}
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="p-6 bg-slate-900/50 border-t border-slate-700/50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-slate-300 font-semibold hover:bg-slate-700/50 rounded-xl transition-all">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Procesando...</> : "Confirmar Depósito"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
