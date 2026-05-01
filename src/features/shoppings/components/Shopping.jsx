import { useState } from "react";
import { 
    ShoppingBag, 
    Search, 
    MoreVertical, 
    XCircle, 
    CheckCircle2, 
    Calendar, 
    CreditCard, 
    Plus,
    ArrowUpRight 
} from "lucide-react";
import { ShoppingModal } from "./ShoppingModal";

export const Shopping = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);

    const shoppings = [
        { id: 1, cuenta_id: 1020, producto_id: 5, product_name: "Seguro de Vida", monto: 150.00, fecha: "2026-05-01T14:20:00", estado: "COMPLETADO" },
        { id: 2, cuenta_id: 3045, producto_id: 12, product_name: "Tarjeta Gold", monto: 500.00, fecha: "2026-04-30T10:15:00", estado: "ANULADO" }
    ];

    const filteredShoppings = shoppings.filter(s => 
        s.cuenta_id.toString().includes(searchTerm) || 
        s.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto">
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <ShoppingBag className="text-emerald-400 w-8 h-8" />
                            Registro de Compras
                        </h1>
                        <p className="text-slate-400 text-sm">Gestión de adquisiciones NovaPay</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white w-64 focus:ring-2 focus:ring-emerald-500/50 outline-none"
                            />
                        </div>
                        <button 
                            onClick={() => setShowModal(true)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                        >
                            <Plus className="w-5 h-5" /> Nueva Compra
                        </button>
                    </div>
                </div>

                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-700/30 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Cliente / Producto</th>
                                <th className="px-6 py-4 text-center">Monto</th>
                                <th className="px-6 py-4 text-center">Estado</th>
                                <th className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> Fecha
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {filteredShoppings.map((item) => (
                                <tr key={item.id} className="group hover:bg-slate-700/20 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">#{item.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 text-white font-semibold">
                                                <CreditCard className="w-4 h-4 text-emerald-500" />
                                                ACC-{item.cuenta_id}
                                            </div>
                                            <div className="flex items-center gap-1 text-[11px] text-slate-400 ml-6">
                                                <ArrowUpRight className="w-3 h-3 text-slate-500" />
                                                {item.product_name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-white font-mono">Q{item.monto.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-center">
                                        {item.estado === 'COMPLETADO' ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                                <CheckCircle2 className="w-3 h-3" />
                                                {item.estado}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border bg-rose-500/10 text-rose-400 border-rose-500/20">
                                                <XCircle className="w-3 h-3" />
                                                {item.estado}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-400">
                                        {new Date(item.fecha).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-slate-400 hover:text-white transition-all">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && <ShoppingModal isOpen={showModal} onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
};