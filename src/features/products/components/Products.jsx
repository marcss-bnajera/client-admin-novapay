import { useState, useEffect } from "react";
import { ProductModal } from "./ProductModal";
import { useProductsStore } from "../store/productsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { Search, Plus, Package, Tag, DollarSign, Activity, Edit3, Trash2, Layers, RefreshCw } from "lucide-react";

export const Products = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const { products, loading, getProducts, deleteProduct } = useProductsStore();

    useEffect(() => {
        getProducts();
    }, []);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
        try {
            await deleteProduct(id);
            showSuccess("Producto eliminado correctamente");
        } catch {
            showError("Error al eliminar el producto");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const getStateColor = (state) => {
        const colors = {
            ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            INACTIVE: "bg-slate-500/10 text-slate-400 border-slate-500/20",
            DISCONTINUED: "bg-red-500/10 text-red-400 border-red-500/20",
            PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
        return colors[state] || colors.INACTIVE;
    };

    const filteredProducts = products.filter((p) => {
        const term = searchTerm.toLowerCase();
        return (
            (p.name || p.nombre || "").toLowerCase().includes(term) ||
            (p.category || p.categoria || "").toLowerCase().includes(term)
        );
    });

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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all w-64"
                            />
                        </div>
                        <button onClick={() => { setSelectedProduct(null); setShowModal(true); }} className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 rounded-xl text-white font-bold transition-all shadow-lg shadow-emerald-500/20">
                            <Plus className="w-5 h-5" /> Nuevo Producto
                        </button>
                        <button onClick={getProducts} disabled={loading} className="p-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-emerald-400 transition-all">
                            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* TABLA */}
                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-700/30 text-slate-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">ID</th>
                                <th className="px-6 py-4 font-semibold flex items-center gap-2"><Tag className="w-4 h-4" /> Producto</th>
                                <th className="px-6 py-4 font-semibold"><div className="flex items-center gap-2"><Layers className="w-4 h-4" /> Categoría</div></th>
                                <th className="px-6 py-4 font-semibold text-center"><div className="flex items-center justify-center gap-2"><DollarSign className="w-4 h-4" /> Precio</div></th>
                                <th className="px-6 py-4 font-semibold text-center"><div className="flex items-center justify-center gap-2"><Activity className="w-4 h-4" /> Estado</div></th>
                                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {loading && filteredProducts.length === 0 ? (
                                <tr key="loading"><td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" /> Cargando productos...
                                </td></tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr key="empty"><td colSpan="6" className="px-6 py-12 text-center text-slate-500 italic">No se encontraron productos.</td></tr>
                            ) : filteredProducts.map((prod) => (
                                <tr key={prod.id || prod._id} className="group hover:bg-slate-700/20 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-slate-500 font-mono text-xs">#{prod.id || prod._id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                                <Package className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-white font-semibold text-sm">{prod.name || prod.nombre}</div>
                                                <div className="text-[11px] text-slate-500 truncate max-w-[180px]">{prod.description || prod.descripcion}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-300 bg-slate-700/30 px-2 py-1 rounded-md border border-slate-600/30">{prod.category || prod.categoria}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-emerald-400 font-mono font-bold tracking-tighter">Q{parseFloat(prod.price || prod.precio || 0).toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 text-[10px] rounded-full font-bold border uppercase inline-block min-w-[85px] ${getStateColor(prod.state || prod.estado)}`}>
                                            {prod.state || prod.estado || "ACTIVE"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(prod)} className="p-2 rounded-lg hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all"><Edit3 className="w-4 h-4" /></button>
                                            <button onClick={() => handleDelete(prod.id || prod._id)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && <ProductModal isOpen={showModal} onClose={handleCloseModal} product={selectedProduct} onSaved={getProducts} />}
            </div>
        </div>
    );
};
