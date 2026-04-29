import { useState } from "react";
import { ProductModal } from "./ProductModal";
import { Search, Plus, Package, Tag, DollarSign, Activity, Edit3, Trash2, Layers } from "lucide-react";

export const Products = () => {
    const [showModal, setShowModal] = useState(false);

    // Datos simulados basados en tu modelo Product
    const products = [
        {
            id: 1,
            name: "Cuenta Premium Nova",
            description: "Servicios bancarios con beneficios exclusivos",
            category: "Servicios",
            price: 150.00,
            state: "ACTIVE"
        },
        {
            id: 2,
            name: "Seguro de Vida Platinium",
            description: "Cobertura total para incidentes mayores",
            category: "Seguros",
            price: 75.50,
            state: "PENDING"
        }
    ];

    const getStateColor = (state) => {
        const colors = {
            ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            INACTIVE: "bg-slate-500/10 text-slate-400 border-slate-500/20",
            DISCONTINUED: "bg-red-500/10 text-red-400 border-red-500/20",
            PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20"
        };
        return colors[state] || colors.INACTIVE;
    };

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Catálogo de Productos</h1>
                        <p className="text-slate-400 text-sm">Gestiona los servicios y productos financieros disponibles</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar producto..."
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all w-64"
                            />
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 rounded-xl text-white font-bold transition-all shadow-lg shadow-emerald-500/20"
                        >
                            <Plus className="w-5 h-5" />
                            Nuevo Producto
                        </button>
                    </div>
                </div>

                {/* TABLA DE PRODUCTOS */}
                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-700/30 text-slate-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold flex items-center gap-2">
                                    <Tag className="w-4 h-4" /> Producto
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    <div className="flex items-center gap-2">
                                        <Layers className="w-4 h-4" /> Categoría
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-semibold text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <DollarSign className="w-4 h-4" /> Precio
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-semibold text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <Activity className="w-4 h-4" /> Estado
                                    </div>
                                </th>
                                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {products.map((prod) => (
                                <tr key={prod.id} className="group hover:bg-slate-700/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                                <Package className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-white font-semibold text-sm">{prod.name}</div>
                                                <div className="text-[11px] text-slate-500 truncate max-w-[180px]">{prod.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-300 bg-slate-700/30 px-2 py-1 rounded-md border border-slate-600/30">
                                            {prod.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-emerald-400 font-mono font-bold tracking-tighter">
                                            Q{parseFloat(prod.price).toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold border uppercase inline-block min-w-[85px] ${getStateColor(prod.state)}`}>
                                            {prod.state}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && <ProductModal isOpen={showModal} onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
};