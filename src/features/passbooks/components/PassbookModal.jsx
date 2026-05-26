import { useForm } from "react-hook-form";
import { useSavePassbook } from "../hooks/useSavePassbook";
import { X, BookOpen, CreditCard, CheckCircle, RefreshCw, PiggyBank, Banknote, Clock, Baby } from "lucide-react";

// Configuración visual por tipo de libreta
const TIPOS_LIBRETA = [
    {
        value: "AHORRO",
        label: "Ahorro",
        description: "Cuenta de ahorro con intereses básicos",
        icon: <PiggyBank className="w-5 h-5" />,
        color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400",
        selected: "ring-2 ring-emerald-500 border-emerald-500",
    },
    {
        value: "CORRIENTE",
        label: "Corriente",
        description: "Cuenta operativa para uso diario",
        icon: <Banknote className="w-5 h-5" />,
        color: "from-violet-500/20 to-purple-500/20 border-violet-500/40 text-violet-400",
        selected: "ring-2 ring-violet-500 border-violet-500",
    },
    {
        value: "PLAZO_FIJO",
        label: "Plazo Fijo",
        description: "Depósito a término con mayor rendimiento",
        icon: <Clock className="w-5 h-5" />,
        color: "from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400",
        selected: "ring-2 ring-amber-500 border-amber-500",
    },
    {
        value: "INFANTIL",
        label: "Infantil",
        description: "Cuenta de ahorro para menores de edad",
        icon: <Baby className="w-5 h-5" />,
        color: "from-sky-500/20 to-blue-500/20 border-sky-500/40 text-sky-400",
        selected: "ring-2 ring-sky-500 border-sky-500",
    },
];

export const PassbookModal = ({ isOpen, onClose, onSaved }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: { tipo_libreta: "AHORRO" }
    });
    const { savePassbook, loading } = useSavePassbook();

    const tipoSeleccionado = watch("tipo_libreta");

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        const success = await savePassbook(data);
        if (success) {
            onSaved?.();
            reset();
            onClose();
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
                        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 space-y-5">

                        {/* SELECTOR DE TIPO */}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 block">
                                Tipo de Libreta
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {TIPOS_LIBRETA.map((tipo) => (
                                    <label
                                        key={tipo.value}
                                        className={`
                                            flex flex-col gap-2 p-3 rounded-xl border bg-gradient-to-br cursor-pointer transition-all
                                            ${tipo.color}
                                            ${tipoSeleccionado === tipo.value ? tipo.selected : ""}
                                        `}
                                    >
                                        <input
                                            type="radio"
                                            value={tipo.value}
                                            {...register("tipo_libreta", { required: true })}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-white">{tipo.label}</span>
                                            {tipo.icon}
                                        </div>
                                        <p className="text-[10px] text-slate-400 leading-tight">{tipo.description}</p>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* NÚMERO DE CUENTA */}
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
                            {errors.numero_cuenta && (
                                <p className="text-red-400 text-xs mt-1">{errors.numero_cuenta.message}</p>
                            )}
                        </div>

                        {/* NOTA */}
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-slate-400 leading-tight">
                                El número de libreta se genera automáticamente (12 dígitos únicos). La libreta se crea en estado{" "}
                                <span className="text-emerald-400 font-bold">ACTIVA</span>.
                                Una cuenta solo puede tener una libreta de cada tipo.
                            </p>
                        </div>
                    </div>

                    {/* ACCIONES */}
                    <div className="p-6 bg-slate-900/30 border-t border-slate-700/50 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 text-slate-400 font-semibold hover:bg-slate-700/50 rounded-xl transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {loading
                                ? <><RefreshCw className="w-4 h-4 animate-spin" /> Guardando...</>
                                : "Confirmar Registro"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};