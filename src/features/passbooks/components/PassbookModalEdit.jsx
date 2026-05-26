import { useForm } from "react-hook-form";
import { usePassbooksStore } from "../store/passbooksStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { X, CheckCircle, Ban, AlertCircle, PiggyBank, Banknote, Clock, Baby } from "lucide-react";

const TIPO_CONFIG = {
    AHORRO:     { label: "Ahorro",      icon: <PiggyBank className="w-4 h-4" />, cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    CORRIENTE:  { label: "Corriente",   icon: <Banknote  className="w-4 h-4" />, cls: "text-violet-400  bg-violet-500/10  border-violet-500/20"  },
    PLAZO_FIJO: { label: "Plazo Fijo",  icon: <Clock     className="w-4 h-4" />, cls: "text-amber-400   bg-amber-500/10   border-amber-500/20"   },
    INFANTIL:   { label: "Infantil",    icon: <Baby      className="w-4 h-4" />, cls: "text-sky-400     bg-sky-500/10     border-sky-500/20"     },
};

const ESTADOS = [
    { value: "ACTIVA",    icon: <CheckCircle className="w-5 h-5 text-emerald-400" />, hover: "hover:border-emerald-500/50" },
    { value: "INACTIVA",  icon: <Ban         className="w-5 h-5 text-slate-400"   />, hover: "hover:border-slate-500/50"   },
    { value: "BLOQUEADA", icon: <AlertCircle className="w-5 h-5 text-red-400"     />, hover: "hover:border-red-500/50"     },
];

export const PassbookModalEdit = ({ isOpen, onClose, passbook }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: { estado: passbook?.estado }
    });
    const { updatePassbook, loading } = usePassbooksStore();

    if (!isOpen || !passbook) return null;

    const onSubmit = async (data) => {
        try {
            await updatePassbook(passbook.id, data.estado);
            showSuccess("Estado actualizado correctamente");
            onClose();
        } catch {
            showError("No se pudo actualizar el estado");
        }
    };

    const tipo = TIPO_CONFIG[passbook.tipo_libreta] || TIPO_CONFIG.AHORRO;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">

                {/* HEADER */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <div className="space-y-2">
                        <h2 className="text-xl font-bold text-white">Gestionar Libreta</h2>
                        <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full font-bold border ${tipo.cls}`}>
                                {tipo.icon} {tipo.label}
                            </span>
                            <span className="text-xs text-slate-500 font-mono">
                                {passbook.numero_libreta}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    <div>
                        <label className="text-xs text-slate-400 block mb-4 uppercase tracking-widest font-bold">
                            Seleccionar Nuevo Estado
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                            {ESTADOS.map(({ value, icon, hover }) => (
                                <label
                                    key={value}
                                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all bg-slate-800/40 border-slate-700/50 ${hover} group`}
                                >
                                    <div className="flex items-center gap-3">
                                        {icon}
                                        <span className="text-white font-medium group-hover:translate-x-1 transition-transform">
                                            {value}
                                        </span>
                                    </div>
                                    <input
                                        type="radio"
                                        value={value}
                                        {...register("estado")}
                                        className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 bg-slate-700 border-slate-600"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 text-slate-300 font-semibold hover:bg-slate-800 rounded-xl transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                        >
                            {loading ? "Procesando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};