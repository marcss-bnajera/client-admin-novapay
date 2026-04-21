import React from "react";
import { X, Wallet, User, DollarSign, AlertCircle } from "lucide-react";

export const AccountModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3 animate-in fade-in duration-200">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-700/50 animate-in zoom-in duration-200">

                {/* HEADER */}
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20"></div>
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <Wallet className="w-6 h-6" />
                                </div>
                                Nueva Cuenta
                            </h2>
                            <p className="text-sm text-emerald-100 mt-1 ml-13">
                                Apertura de producto financiero
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
                            <User className="w-3.5 h-3.5" />
                            Buscar Usuario (Titular)
                        </label>
                        <select className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                            <option value="">Seleccione al cliente</option>
                            <option value="1">Juan Pérez - 1234 5678 0101</option>
                            <option value="2">Marcos Beteta - 1934 1234 0101</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <Wallet className="w-3.5 h-3.5" />
                                Tipo de Cuenta
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                                <option value="monetaria">Monetaria</option>
                                <option value="ahorro">Ahorro</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <DollarSign className="w-3.5 h-3.5" />
                                Saldo Inicial
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Q</span>
                                <input
                                    type="number"
                                    className="w-full px-4 py-3 pl-10 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-400 uppercase mb-2">
                            Número de Cuenta Sugerido
                        </label>
                        <input
                            type="text"
                            disabled
                            className="w-full px-4 py-3 rounded-xl bg-slate-900/30 border border-slate-700/30 text-slate-500 cursor-not-allowed font-mono"
                            value="GENERADO-AUTOMATICAMENTE"
                        />
                    </div>

                    <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs text-emerald-400 font-semibold mb-1">NOTA IMPORTANTE</p>
                                <p className="text-xs text-emerald-300/80 leading-relaxed">
                                    Al aperturar una cuenta, se generará un registro de actividad inicial. Asegúrese de que el DPI del cliente esté verificado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ACCIONES */}
                <div className="p-6 bg-slate-900/50 border-t border-slate-700/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-slate-300 font-semibold hover:bg-slate-700/50 rounded-xl transition-all"
                    >
                        Cancelar
                    </button>
                    <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all">
                        Crear Cuenta
                    </button>
                </div>
            </div>
        </div>
    );
};