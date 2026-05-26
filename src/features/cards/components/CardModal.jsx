import { useForm } from "react-hook-form";
import { useCardsStore } from "../store/cardsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { X, CreditCard, ShieldCheck, Info, RefreshCw, Wallet, Globe, Star } from "lucide-react";

// Configuración visual de cada tipo
const TIPOS_TARJETA = [
    {
        value: "DEBITO",
        label: "Débito",
        description: "Vinculada al saldo de la cuenta",
        icon: <CreditCard className="w-5 h-5" />,
        color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400",
        selected: "ring-2 ring-emerald-500 border-emerald-500",
    },
    {
        value: "CREDITO",
        label: "Crédito",
        description: "Línea de crédito NovaPay (vence en 3 años)",
        icon: <Star className="w-5 h-5" />,
        color: "from-violet-500/20 to-purple-500/20 border-violet-500/40 text-violet-400",
        selected: "ring-2 ring-violet-500 border-violet-500",
    },
    {
        value: "PREPAGO",
        label: "Prepago",
        description: "Saldo precargado, sin cuenta asociada",
        icon: <Wallet className="w-5 h-5" />,
        color: "from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400",
        selected: "ring-2 ring-amber-500 border-amber-500",
    },
    {
        value: "VIRTUAL",
        label: "Virtual",
        description: "Solo para compras en línea",
        icon: <Globe className="w-5 h-5" />,
        color: "from-sky-500/20 to-blue-500/20 border-sky-500/40 text-sky-400",
        selected: "ring-2 ring-sky-500 border-sky-500",
    },
];

export const CardModal = ({ isOpen, onClose, onSaved }) => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: { tipo_tarjeta: "DEBITO" }
    });
    const { createCard, loading } = useCardsStore();

    const tipoSeleccionado = watch("tipo_tarjeta");

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            await createCard(data);
            showSuccess("Tarjeta emitida correctamente");
            onSaved?.();
            reset();
            onClose();
        } catch (error) {
            const msg = error?.response?.data?.message || "Error al emitir la tarjeta";
            showError(msg);
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
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                Nueva Tarjeta
                            </h2>
                            <p className="text-sm text-emerald-100 mt-1">Emisión de tarjeta NovaPay</p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white">
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
                                Tipo de Tarjeta
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {TIPOS_TARJETA.map((tipo) => (
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
                                            {...register("tipo_tarjeta", { required: true })}
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
                                <CreditCard className="w-3.5 h-3.5" /> Número de Cuenta
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

                        {/* ESTRUCTURA DEL NÚMERO */}
                        <div className="p-4 bg-slate-900/60 border border-slate-700/50 rounded-xl space-y-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> Estructura del número (16 dígitos)
                            </p>
                            <div className="flex items-center gap-1 font-mono text-xs flex-wrap">
                                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-1 rounded-lg">
                                    {TIPOS_TARJETA.find(t => t.value === tipoSeleccionado)?.value === "DEBITO"  ? "490001" :
                                     tipoSeleccionado === "CREDITO" ? "490002" :
                                     tipoSeleccionado === "PREPAGO" ? "490003" : "490004"}
                                </span>
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

                        {/* NOTA INFORMATIVA */}
                        <div className="flex gap-3 p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl">
                            <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                            <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-semibold">
                                El número, CVV y fecha de expiración se generan automáticamente. La tarjeta queda en estado ACTIVA.
                                Una cuenta solo puede tener una tarjeta de cada tipo.
                            </p>
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="p-6 bg-slate-900/50 border-t border-slate-700/50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-slate-300 font-semibold hover:bg-slate-700/50 rounded-xl transition-all">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 disabled:opacity-70">
                            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Procesando...</> : "Emitir Tarjeta"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};