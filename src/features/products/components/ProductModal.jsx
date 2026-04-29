import React from "react";
import { X, Tag, FileText, DollarSign, Activity, Layers, Package } from "lucide-react";

export const ProductModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-700/50">
                
                {/* HEADER */}
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-white">
                        <Package className="w-6 h-6" />
                        <h2 className="text-xl font-bold">Configurar Producto</h2>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* FORM */}
                <div className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                            <Tag className="w-3 h-3 text-emerald-500" /> Nombre del Producto
                        </label>
                        <input 
                            type="text"
                            placeholder="Ej. Seguro de Viaje"
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                            <FileText className="w-3 h-3 text-emerald-500" /> Descripción
                        </label>
                        <textarea 
                            rows="2"
                            placeholder="Detalles del producto..."
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all resize-none"
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                                <Layers className="w-3 h-3 text-emerald-500" /> Categoría
                            </label>
                            <input 
                                type="text"
                                defaultValue="General"
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                                <DollarSign className="w-3 h-3 text-emerald-500" /> Precio (Q)
                            </label>
                            <input 
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2">
                            <Activity className="w-3 h-3 text-emerald-500" /> Estado Inicial
                        </label>
                        <select className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all appearance-none">
                            <option value="ACTIVE">ACTIVO</option>
                            <option value="PENDING">PENDIENTE</option>
                            <option value="INACTIVE">INACTIVO</option>
                        </select>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="p-6 bg-slate-900/30 border-t border-slate-700/50 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 text-slate-400 font-semibold hover:bg-slate-700 rounded-xl transition-all">
                        Descartar
                    </button>
                    <button className="flex-[2] py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
                        Guardar Producto
                    </button>
                </div>
            </div>
        </div>
    );
};