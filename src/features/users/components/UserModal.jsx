import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUsersStore } from "../store/usersStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { getRoles } from "../../../shared/api/admin";
import { X, User, Mail, IdCard, Phone, Briefcase, MapPin, Lock, RefreshCw } from "lucide-react";

export const UserModal = ({ isOpen, onClose, user, onSaved }) => {
    const { register, handleSubmit, reset, setValue, trigger, formState: { errors } } = useForm({
        mode: "onChange"
    });
    const { createUser, updateUser, loading } = useUsersStore();
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getRoles()
            .then(res => {
                const data = res.data?.roles || res.data?.data || res.data || [];
                setRoles(Array.isArray(data) ? data : []);
            })
            .catch(() => setRoles([]));
    }, []);

    const allowOnlyLetters = value => {
        return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, "");
    };

    const allowOnlyNumbers = value => {
        return value.replace(/[^0-9]/g, "");
    };

    useEffect(() => {
        if (isOpen) {
            if (user) {
                reset({
                    nombre: user.nombre || "",
                    apellido: user.apellido || "",
                    username: user.username || "",
                    email: user.email || "",
                    dpi: user.dpi || "",
                    nit: user.nit || "",
                    telefono: user.telefono || "",
                    nombre_trabajo: user.nombre_trabajo || "",
                    ingresos_mensuales: user.ingresos_mensuales || "",
                    direccion: user.direccion || "",
                    role_id: user.role_id || user.role?.id || user.Role?.id || "",
                });
            } else {
                reset({
                    nombre: "", apellido: "", username: "", email: "",
                    dpi: "", nit: "", telefono: "", nombre_trabajo: "",
                    ingresos_mensuales: "", direccion: "", password: "",
                    role_id: "",
                });
            }
        }
    }, [isOpen, user, reset]);

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            const payload = { ...data, ingresos_mensuales: parseFloat(data.ingresos_mensuales), role_id: parseInt(data.role_id) };

            if (user) {
                await updateUser(user.id || user._id, payload);
                showSuccess("Usuario actualizado correctamente");
            } else {
                await createUser(payload);
                showSuccess("Usuario creado correctamente");
            }
            onSaved?.();
            reset();
            onClose();
        } catch {
            showError("Error al guardar el usuario");
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all";
    const labelClass = "text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2";

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-700/50">

                {/* HEADER */}
                <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 relative overflow-hidden">
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <User className="w-6 h-6" />
                                </div>
                                {user ? "Editar Usuario" : "Registro de Usuario"}
                            </h2>
                            <p className="text-sm text-emerald-100 mt-1">
                                {user ? "Actualizar datos del cliente" : "Datos de Cliente NovaPay"}
                            </p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
                    <div className="p-6 space-y-4 overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* NOMBRE */}
                            <div className="flex flex-col">
                                <label className={labelClass}><User className="w-3.5 h-3.5" /> Nombre</label>
                                <input type="text" className={inputClass} placeholder="Ej. Juan" maxLength={50}
                                    {...register("nombre", {
                                        required: "El nombre es obligatorio",
                                        onChange: (e) => {
                                            const clean = allowOnlyLetters(e.target.value);
                                            setValue("nombre", clean);
                                            trigger("nombre");
                                        }
                                    })} />
                                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>}
                            </div>

                            {/* APELLIDO */}
                            <div className="flex flex-col">
                                <label className={labelClass}><User className="w-3.5 h-3.5" /> Apellido</label>
                                <input type="text" className={inputClass} placeholder="Ej. Pérez" maxLength={50}
                                    {...register("apellido", {
                                        required: "El apellido es obligatorio",
                                        onChange: (e) => {
                                            const clean = allowOnlyLetters(e.target.value);
                                            setValue("apellido", clean);
                                            trigger("apellido");
                                        }
                                    })} />
                                {errors.apellido && <p className="text-red-400 text-xs mt-1">{errors.apellido.message}</p>}
                            </div>

                            {/* USERNAME */}
                            <div className="flex flex-col">
                                <label className={labelClass}><User className="w-3.5 h-3.5" /> Nombre de Usuario</label>
                                <input type="text" className={inputClass} placeholder="jperez"
                                    {...register("username", { required: "El username es obligatorio", minLength: { value: 3, message: "Mínimo 3 caracteres" } })} />
                                {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>}
                            </div>

                            {/* EMAIL */}
                            <div className="flex flex-col">
                                <label className={labelClass}><Mail className="w-3.5 h-3.5" /> Email</label>
                                <input type="email" className={inputClass} placeholder="juan@ejemplo.com"
                                    {...register("email", { required: "El email es obligatorio", pattern: { value: /^\S+@\S+\.\S+$/, message: "Email inválido" } })} />
                                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            {/* DPI */}
                            <div className="flex flex-col">
                                <label className={labelClass}><IdCard className="w-3.5 h-3.5" /> DPI (13 dígitos)</label>
                                <input type="text" className={inputClass} placeholder="0000000000000" maxLength={13}
                                    {...register("dpi", {
                                        required: "El DPI es obligatorio",
                                        minLength: { value: 13, message: "El DPI debe tener 13 dígitos" },
                                        onChange: (e) => {
                                            const clean = allowOnlyNumbers(e.target.value);
                                            setValue("dpi", clean);
                                            trigger("dpi");
                                        }
                                    })} />
                                {errors.dpi && <p className="text-red-400 text-xs mt-1">{errors.dpi.message}</p>}
                            </div>

                            {/* NIT */}
                            <div className="flex flex-col">
                                <label className={labelClass}><IdCard className="w-3.5 h-3.5" /> NIT</label>
                                <input type="text" className={inputClass} placeholder="1234567-K" maxLength={9}
                                    {...register("nit", { required: "El NIT es obligatorio" })} />
                                {errors.nit && <p className="text-red-400 text-xs mt-1">{errors.nit.message}</p>}
                            </div>

                            {/* TELÉFONO */}
                            <div className="flex flex-col">
                                <label className={labelClass}><Phone className="w-3.5 h-3.5" /> Teléfono</label>
                                <input type="text" className={inputClass} placeholder="50000000" maxLength={8}
                                    {...register("telefono", {
                                        required: "El teléfono es obligatorio",
                                        minLength: { value: 8, message: "El teléfono debe tener 8 dígitos" },
                                        onChange: (e) => {
                                            const clean = allowOnlyNumbers(e.target.value);
                                            setValue("telefono", clean);
                                            trigger("telefono");
                                        }
                                    })} />
                                {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono.message}</p>}
                            </div>

                            {/* TRABAJO */}
                            <div className="flex flex-col">
                                <label className={labelClass}><Briefcase className="w-3.5 h-3.5" /> Empresa / Trabajo</label>
                                <input type="text" className={inputClass} placeholder="Nombre de la empresa"
                                    {...register("nombre_trabajo")} />
                            </div>

                            {/* INGRESOS */}
                            <div className="flex flex-col">
                                <label className={labelClass}>Ingresos Mensuales (Q)</label>
                                <input type="number" step="0.01" className={inputClass} placeholder="0.00"
                                    {...register("ingresos_mensuales", { required: "Los ingresos son obligatorios", min: { value: 100, message: "Mínimo Q100.00" } })} />
                                {errors.ingresos_mensuales && <p className="text-red-400 text-xs mt-1">{errors.ingresos_mensuales.message}</p>}
                            </div>

                            {/* ROL */}
                            <div className="flex flex-col">
                                <label className={labelClass}>Rol</label>
                                <select className={inputClass} {...register("role_id", { required: "Selecciona un rol" })}>
                                    <option value="">Seleccione un rol</option>
                                    {roles.length > 0 ? (
                                        roles.map(r => (
                                            <option key={r.id} value={r.id}>{r.name}</option>
                                        ))
                                    ) : (
                                        <>
                                            <option value="1">Administrador</option>
                                            <option value="2">Cliente</option>
                                        </>
                                    )}
                                </select>
                                {errors.role_id && <p className="text-red-400 text-xs mt-1">{errors.role_id.message}</p>}
                            </div>

                            {/* DIRECCIÓN */}
                            <div className="flex flex-col md:col-span-2">
                                <label className={labelClass}><MapPin className="w-3.5 h-3.5" /> Dirección</label>
                                <textarea className={`${inputClass} h-20 resize-none`} placeholder="Dirección de residencia"
                                    {...register("direccion", { required: "La dirección es obligatoria" })} />
                                {errors.direccion && <p className="text-red-400 text-xs mt-1">{errors.direccion.message}</p>}
                            </div>

                            {/* CONTRASEÑA */}
                            {!user && (
                                <div className="flex flex-col md:col-span-2 pt-4 border-t border-slate-700/50">
                                    <label className={labelClass}><Lock className="w-3.5 h-3.5" /> Contraseña Temporal</label>
                                    <input type="password" className={inputClass} placeholder="••••••••"
                                        {...register("password", { required: "La contraseña es obligatoria", minLength: { value: 8, message: "Mínimo 8 caracteres" } })} />
                                    {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* BOTONES */}
                    <div className="p-6 bg-slate-900/50 border-t border-slate-700/50 flex flex-col sm:flex-row justify-end gap-3">
                        <button type="button" onClick={onClose}
                            className="px-6 py-3 text-slate-300 font-semibold hover:bg-slate-700/50 rounded-xl transition-all">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Guardando...</> : user ? "Actualizar Usuario" : "Guardar Usuario"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};