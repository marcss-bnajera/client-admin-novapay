import React from "react";
import { X, User, Mail, IdCard, Phone, Briefcase, MapPin, Lock } from "lucide-react";

export const UserModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3 animate-in fade-in duration-200">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-700/50 animate-in zoom-in duration-200">

                {/* HEADER */}
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20"></div>
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <User className="w-6 h-6" />
                                </div>
                                Registro de Usuario
                            </h2>
                            <p className="text-sm text-emerald-100 mt-1 ml-13">
                                Datos de Cliente NovaPay
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
                <div className="p-6 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Datos Personales */}
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <User className="w-3.5 h-3.5" />
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                placeholder="Ej. Juan"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <User className="w-3.5 h-3.5" />
                                Apellido
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                placeholder="Ej. Pérez"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <User className="w-3.5 h-3.5" />
                                Nombre de Usuario
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                placeholder="jperez"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5" />
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                placeholder="juan@ejemplo.com"
                            />
                        </div>

                        {/* Documentación */}
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <IdCard className="w-3.5 h-3.5" />
                                DPI
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                placeholder="0000 00000 0000"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <IdCard className="w-3.5 h-3.5" />
                                NIT
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                placeholder="1234567-K"
                            />
                        </div>

                        {/* Contacto y Trabajo */}
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5" />
                                Teléfono
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                placeholder="+502 0000-0000"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <Briefcase className="w-3.5 h-3.5" />
                                Empresa de Trabajo
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                placeholder="Nombre de la empresa"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2">
                                Ingresos Mensuales
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

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2">
                                Rol de Usuario
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all">
                                <option value="">Seleccione un rol</option>
                                <option value="1">Administrador</option>
                                <option value="2">Cliente</option>
                            </select>
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5" />
                                Dirección Completa
                            </label>
                            <textarea
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all h-24 resize-none"
                                placeholder="Dirección de residencia"
                            ></textarea>
                        </div>

                        <div className="flex flex-col md:col-span-2 pt-4 border-t border-slate-700/50">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <Lock className="w-3.5 h-3.5" />
                                Contraseña Temporal
                            </label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="p-6 bg-slate-900/50 border-t border-slate-700/50 flex flex-col sm:flex-row justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-slate-300 font-semibold hover:bg-slate-700/50 rounded-xl transition-all"
                    >
                        Cancelar
                    </button>
                    <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all">
                        Guardar Usuario
                    </button>
                </div>
            </div>
        </div>
    );
};