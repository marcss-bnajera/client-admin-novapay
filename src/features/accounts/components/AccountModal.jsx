import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAccountsStore } from "../store/accountsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { X, Wallet, User, AlertCircle, RefreshCw } from "lucide-react";

export const AccountModal = ({ isOpen, onClose, account, onSaved }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { addExtraAccount, updateAccount, loading } = useAccountsStore();

    useEffect(() => {
        if (isOpen) {
            if (account) {
                reset({
                    nombre_cuenta: account.nombre_cuenta || "",
                    tipo_cuenta: account.tipo_cuenta || "AHORRO",
                    estado: account.estado || "Activa",
                    balance: account.balance || 0,
                });
            } else {
                reset({ usuario_id: "", tipo_cuenta: "AHORRO" });
            }
        }
    }, [isOpen, account, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            if (account) {
                await updateAccount(account.numero_cuenta, data);
                showSuccess("Cuenta actualizada correctamente");
            } else {
                await addExtraAccount({ usuario_id: parseInt(data.usuario_id), tipo_cuenta: data.tipo_cuenta });
                showSuccess("Cuenta aperturada correctamente");
            }
            onSaved?.();
            reset();
            onClose();
        } catch {
            showError("Error al guardar la cuenta");
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all";
    const labelClass = "text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2";

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-700/50">

                {/* HEADER */}
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 relative overflow-hidden">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                {account ? "Editar Cuenta" : "Nueva Cuenta Adicional"}
                            </h2>
                            <p className="text-sm text-emerald-100 mt-1">
                                {account ? "Actualizar datos de la cuenta" : "El número de cuenta se genera automáticamente"}
                            </p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 space-y-5">
                        {!account ? (
                            <>
                                <div className="flex flex-col">
                                    <label className={labelClass}><User className="w-3.5 h-3.5" /> ID del Usuario Titular</label>
                                    <input
                                        type="number"
                                        className={inputClass}
                                        placeholder="Ej. 3 (ver columna ID en la tabla de usuarios)"
                                        {...register("usuario_id", { required: "El ID del usuario es obligatorio" })}
                                    />
                                    {errors.usuario_id && <p className="text-red-400 text-xs mt-1">{errors.usuario_id.message}</p>}
                                </div>

                                <div className="flex flex-col">
                                    <label className={labelClass}><Wallet className="w-3.5 h-3.5" /> Tipo de Cuenta</label>
                                    <select className={inputClass} {...register("tipo_cuenta", { required: "El tipo es obligatorio" })}>
                                        <option value="AHORRO">Ahorro</option>
                                        <option value="MONETARIA">Monetaria</option>
                                    </select>
                                    {errors.tipo_cuenta && <p className="text-red-400 text-xs mt-1">{errors.tipo_cuenta.message}</p>}
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col">
                                    <label className={labelClass}><Wallet className="w-3.5 h-3.5" /> Nombre de la Cuenta</label>
                                    <input type="text" className={inputClass} placeholder="Nombre de la cuenta"
                                        {...register("nombre_cuenta")} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label className={labelClass}><Wallet className="w-3.5 h-3.5" /> Tipo de Cuenta</label>
                                        <select className={inputClass} {...register("tipo_cuenta")}>
                                            <option value="AHORRO">Ahorro</option>
                                            <option value="MONETARIA">Monetaria</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className={labelClass}>Estado</label>
                                        <select className={inputClass} {...register("estado")}>
                                            <option value="Activa">Activa</option>
                                            <option value="Inactiva">Inactiva</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                <p className="text-xs text-emerald-300/80 leading-relaxed">
                                    {account
                                        ? "El número de cuenta no se puede modificar."
                                        : "Se generará un número de cuenta único de 10 dígitos automáticamente. Usa el ID de usuario que aparece en la tabla de usuarios."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ACCIONES */}
                    <div className="p-6 bg-slate-900/50 border-t border-slate-700/50 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-slate-300 font-semibold hover:bg-slate-700/50 rounded-xl transition-all">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Guardando...</> : account ? "Actualizar Cuenta" : "Crear Cuenta"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
