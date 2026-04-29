import React from "react";
import { X, CreditCard, Hash, Lock, Calendar, ShieldCheck, AlertCircle } from "lucide-react";

export const CardModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden border border-slate-700/50">

                {/* HEADER */}
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20"></div>
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <ShieldCheck className="w-6 h-6 text-white" />
                                </div>
                                Nueva Tarjeta
                            </h2>
                            <p className="text-sm text-emerald-100 mt-1">
                                Emisión de tarjeta de débito NovaPay
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* FORMULARIO */}
                <div className="p-6 space-y-5">
                    
                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                            <Hash className="w-3.5 h-3.5" />
                            ID de la Cuenta
                        </label>
                        <input
                            type="number"
                            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                            placeholder="Ej. 50201"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                            <CreditCard className="w-3.5 h-3.5" />
                            Número de Tarjeta (16 dígitos)
                        </label>
                        <input
                            type="text"
                            maxLength="16"
                            className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono"
                            placeholder="0000000000000000"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <Lock className="w-3.5 h-3.5" />
                                CVV
                            </label>
                            <input
                                type="text"
                                maxLength="3"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono text-center"
                                placeholder="000"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />
                                Expiración (MM/AA)
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-mono text-center"
                                placeholder="MM/AA"
                            />
                        </div>
                    </div>

                    {/* Nota de Seguridad */}
                    <div className="flex gap-3 p-4 bg-slate-900/50 border border-slate-700/50 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-slate-500 shrink-0" />
                        <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-semibold">
                            Al crear esta tarjeta, quedará vinculada automáticamente a la cuenta especificada con un estado inicial "ACTIVA".
                        </p>
                    </div>
                </div>

                {/* BOTONES */}
                <div className="p-6 bg-slate-900/50 border-t border-slate-700/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-slate-300 font-semibold hover:bg-slate-700/50 rounded-xl transition-all"
                    >
                        Cancelar
                    </button>
                    <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all">
                        Crear Tarjeta
                    </button>
                </div>
            </div>
        </div>
    );
};