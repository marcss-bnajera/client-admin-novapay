import React from "react";
import { X, BookOpen, Hash, CheckCircle, Info } from "lucide-react";

export const PassbookModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

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
                                <p className="text-[11px] text-emerald-100 uppercase tracking-wider font-medium">Registro de Cuenta</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* CUERPO */}
                <div className="p-6 space-y-6">
                    
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                            <Hash className="w-3.5 h-3.5 text-emerald-500" />
                            ID de Cuenta Relacionada
                        </label>
                        <input
                            type="number"
                            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                            placeholder="Ingrese el ID de cuenta (ej. 1)"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                            <Info className="w-3.5 h-3.5 text-emerald-500" />
                            Número de Libreta Manual
                        </label>
                        <input
                            type="text"
                            maxLength="12"
                            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono"
                            placeholder="Ej. LIB-00000000"
                        />
                        <p className="text-[10px] text-slate-500 mt-2 italic">
                            * El sistema asignará la fecha de hoy automáticamente.
                        </p>
                    </div>

                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-slate-400 leading-tight">
                            La libreta se generará en estado <span className="text-emerald-400 font-bold">ACTIVA</span> por defecto para permitir depósitos inmediatos.
                        </p>
                    </div>
                </div>

                {/* ACCIONES */}
                <div className="p-6 bg-slate-900/30 border-t border-slate-700/50 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 text-slate-400 font-semibold hover:bg-slate-700/50 rounded-xl transition-all"
                    >
                        Cancelar
                    </button>
                    <button className="flex-[2] py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                        Confirmar Registro
                    </button>
                </div>
            </div>
        </div>
    );
};