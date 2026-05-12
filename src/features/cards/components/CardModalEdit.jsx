import { useForm } from "react-hook-form";
import { useCardsStore } from "../store/cardsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { X, CheckCircle, Ban, AlertCircle } from "lucide-react";

export const CardModalEdit = ({ isOpen, onClose, card }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: { estado: card?.estado }
    });
    const { updateCard, loading } = useCardsStore();

    if (!isOpen || !card) return null;

    const onSubmit = async (data) => {
        try {
            await updateCard(card.id, data.estado);
            showSuccess("Estado actualizado correctamente");
            onClose();
        } catch {
            showError("No se pudo actualizar el estado");
        }
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'ACTIVA':
                return { icon: <CheckCircle className="w-5 h-5 text-emerald-400" />, color: 'hover:border-emerald-500/50' };
            case 'INACTIVA':
                return { icon: <Ban className="w-5 h-5 text-slate-400" />, color: 'hover:border-slate-500/50' };
            case 'BLOQUEADA':
                return { icon: <AlertCircle className="w-5 h-5 text-red-400" />, color: 'hover:border-red-500/50' };
            default:
                return { icon: null, color: 'hover:border-slate-500/50' };
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Gestionar Tarjeta</h2>
                        <p className="text-xs text-slate-500 font-mono">ID: {card.id}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    <div>
                        <label className="text-xs text-slate-400 block mb-4 uppercase tracking-widest font-bold">Seleccionar Nuevo Estado</label>
                        <div className="grid grid-cols-1 gap-3">
                            {['ACTIVA', 'INACTIVA', 'BLOQUEADA'].map((status) => {
                                const { icon, color } = getStatusConfig(status);
                                return (
                                    <label key={status} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all bg-slate-800/40 border-slate-700/50 ${color} group`}>
                                        <div className="flex items-center gap-3">
                                            {icon}
                                            <span className="text-white font-medium group-hover:translate-x-1 transition-transform">{status}</span>
                                        </div>
                                        <input
                                            type="radio"
                                            value={status}
                                            {...register("estado")}
                                            className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 bg-slate-700 border-slate-600"
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-3 text-slate-300 font-semibold hover:bg-slate-800 rounded-xl transition-all">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading} className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50">
                            {loading ? "Procesando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};