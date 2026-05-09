import { useForm } from "react-hook-form";
import { usePassbooksStore } from "../store/passbooksStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { X, BookOpen, CreditCard, CheckCircle, RefreshCw } from "lucide-react";

export const PassbookModal = ({ isOpen, onClose, onSaved }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createPassbook, loading } = usePassbooksStore();

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            await createPassbook(data);
            showSuccess("Libreta creada correctamente");
            onSaved?.();
            reset();
            onClose();
        } catch {
            showError("Error al crear la libreta");
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all";

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden border border-slate-700/50">

                {/* HEADER */}
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Nueva Libreta</h2>
                                <p className="text-[11px] text-emerald-100 uppercase tracking-wider font-medium">Registro de cuenta</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                    </div>
                </div>

                {/* CUERPO */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 space-y-6">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <CreditCard className="w-3.5 h-3.5 text-emerald-500" /> Número de Cuenta
                            </label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Ej. 1234567890 (10 dígitos)"
                                {...register("numero_cuenta", { required: "El número de cuenta es obligatorio" })}
                            />
                            {errors.numero_cuenta && <p className="text-red-400 text-xs mt-1">{errors.numero_cuenta.message}</p>}
                        </div>

                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-slate-400 leading-tight">
                                El número de libreta se genera automáticamente (12 dígitos únicos). La libreta se crea en estado <span className="text-emerald-400 font-bold">ACTIVA</span>.
                            </p>
                        </div>
                    </div>

                    {/* ACCIONES */}
                    <div className="p-6 bg-slate-900/30 border-t border-slate-700/50 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-400 font-semibold hover:bg-slate-700/50 rounded-xl transition-all">Cancelar</button>
                        <button type="submit" disabled={loading} className="flex-[2] py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Guardando...</> : "Confirmar Registro"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
