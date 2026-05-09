import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProductsStore } from "../store/productsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { X, Tag, FileText, DollarSign, Activity, Layers, Package, RefreshCw } from "lucide-react";

export const ProductModal = ({ isOpen, onClose, product, onSaved }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createProduct, updateProduct, loading } = useProductsStore();

    useEffect(() => {
        if (isOpen) {
            if (product) {
                reset({
                    name: product.name || product.nombre || "",
                    description: product.description || product.descripcion || "",
                    category: product.category || product.categoria || "General",
                    price: product.price || product.precio || "",
                    state: product.state || product.estado || "ACTIVE",
                });
            } else {
                reset({ name: "", description: "", category: "General", price: "", state: "ACTIVE" });
            }
        }
    }, [isOpen, product, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            if (product) {
                await updateProduct(product.id || product._id, data);
                showSuccess("Producto actualizado correctamente");
            } else {
                await createProduct(data);
                showSuccess("Producto creado correctamente");
            }
            onSaved?.();
            reset();
            onClose();
        } catch {
            showError("Error al guardar el producto");
        }
    };

    const inputClass = "w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all";
    const labelClass = "text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2";

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-700/50">

                {/* HEADER */}
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-white">
                        <Package className="w-6 h-6" />
                        <h2 className="text-xl font-bold">{product ? "Editar Producto" : "Configurar Producto"}</h2>
                    </div>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-6 space-y-4">
                        <div className="space-y-1">
                            <label className={labelClass}><Tag className="w-3 h-3 text-emerald-500" /> Nombre del Producto</label>
                            <input
                                type="text"
                                placeholder="Ej. Seguro de Viaje"
                                className={inputClass}
                                {...register("name", { required: "El nombre es obligatorio" })}
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className={labelClass}><FileText className="w-3 h-3 text-emerald-500" /> Descripción</label>
                            <textarea
                                rows="2"
                                placeholder="Detalles del producto..."
                                className={`${inputClass} resize-none`}
                                {...register("description", { required: "La descripción es obligatoria" })}
                            />
                            {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className={labelClass}><Layers className="w-3 h-3 text-emerald-500" /> Categoría</label>
                                <input
                                    type="text"
                                    className={inputClass}
                                    {...register("category", { required: "La categoría es obligatoria" })}
                                />
                                {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>}
                            </div>
                            <div className="space-y-1">
                                <label className={labelClass}><DollarSign className="w-3 h-3 text-emerald-500" /> Precio (Q)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    className={inputClass}
                                    {...register("price", {
                                        required: "El precio es obligatorio",
                                        min: { value: 0, message: "Debe ser mayor o igual a 0" },
                                    })}
                                />
                                {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className={labelClass}><Activity className="w-3 h-3 text-emerald-500" /> Estado</label>
                            <select className={`${inputClass} appearance-none`} {...register("state")}>
                                <option value="ACTIVE">ACTIVO</option>
                                <option value="PENDING">PENDIENTE</option>
                                <option value="INACTIVE">INACTIVO</option>
                                <option value="DISCONTINUED">DESCONTINUADO</option>
                            </select>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="p-6 bg-slate-900/30 border-t border-slate-700/50 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 text-slate-400 font-semibold hover:bg-slate-700 rounded-xl transition-all">Descartar</button>
                        <button type="submit" disabled={loading} className="flex-[2] py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70">
                            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Guardando...</> : product ? "Actualizar Producto" : "Guardar Producto"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
