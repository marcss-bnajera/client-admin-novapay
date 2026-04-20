export const UserModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[60] px-3">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">

                {/* HEADER CON GRADIENTE NOVAPAY */}
                <div className="p-5 text-white bg-gradient-to-r from-[#1a4b7c] to-[#2563eb]">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">Registro de Usuario</h2>
                            <p className="text-xs opacity-80 uppercase tracking-wider font-semibold text-[#CD9B67]">
                                Datos de Cliente NovaPay
                            </p>
                        </div>
                        <button onClick={onClose} className="text-white hover:text-[#CD9B67] transition text-2xl">×</button>
                    </div>
                </div>

                {/* FORMULARIO */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Datos Personales */}
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Nombre</label>
                            <input type="text" className="input-style" placeholder="Ej. Juan" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Apellido</label>
                            <input type="text" className="input-style" placeholder="Ej. Pérez" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Nombre de Usuario</label>
                            <input type="text" className="input-style" placeholder="jperez" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                            <input type="email" className="input-style" placeholder="juan@ejemplo.com" />
                        </div>

                        {/* Documentación */}
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">DPI</label>
                            <input type="text" className="input-style" placeholder="0000 00000 0000" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">NIT</label>
                            <input type="text" className="input-style" placeholder="1234567-K" />
                        </div>

                        {/* Contacto y Trabajo */}
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Teléfono</label>
                            <input type="text" className="input-style" placeholder="+502 0000-0000" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Empresa de Trabajo</label>
                            <input type="text" className="input-style" placeholder="Nombre de la empresa" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Ingresos Mensuales</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500 font-bold">Q</span>
                                <input type="number" className="input-style pl-8" placeholder="0.00" />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Rol de Usuario</label>
                            <select className="input-style">
                                <option value="">Seleccione un rol</option>
                                <option value="1">Administrador</option>
                                <option value="2">Cliente</option>
                            </select>
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Dirección Completa</label>
                            <textarea className="input-style h-20" placeholder="Dirección de residencia"></textarea>
                        </div>

                        <div className="flex flex-col md:col-span-2 border-t pt-4">
                            <label className="text-xs font-bold text-gray-500 uppercase mb-1">Contraseña Temporal</label>
                            <input type="password" title="password" className="input-style" placeholder="••••••••" />
                        </div>
                    </div>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="p-5 bg-gray-50 flex flex-col sm:flex-row justify-end gap-3 border-t">
                    <button onClick={onClose} className="px-6 py-2 text-gray-600 font-semibold hover:bg-gray-200 rounded-lg transition">
                        Cancelar
                    </button>
                    <button className="px-8 py-2 bg-[#CD9B67] text-white font-bold rounded-lg hover:bg-[#b08554] shadow-lg transition-all">
                        Guardar Usuario
                    </button>
                </div>
            </div>

            {/* Estilos locales para los inputs para no repetir clases */}
            <style jsx>{`
                .input-style {
                    width: 100%;
                    padding: 0.5rem 0.75rem;
                    border-radius: 0.5rem;
                    border: 2px solid #e5e7eb;
                    background-color: #f9fafb;
                    transition: all 0.2s;
                }
                .input-style:focus {
                    outline: none;
                    border-color: #CD9B67;
                    background-color: white;
                    box-shadow: 0 0 0 3px rgba(205, 155, 103, 0.2);
                }
            `}</style>
        </div>
    );
};