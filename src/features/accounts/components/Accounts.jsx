import { useState, useEffect } from "react";
import { AccountModal } from "./AccountModal";
import { useAccountsStore } from "../store/accountsStore";
import { showSuccess, showError } from "../../../shared/utils/toast";
import { TrendingUp, PlusCircle, Edit, XCircle, Wallet, ArrowUpRight, RefreshCw } from "lucide-react";

export const Accounts = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const { accounts, loading, getAccounts, deleteAccount } = useAccountsStore();

    useEffect(() => {
        getAccounts();
    }, []);

    const handleEdit = (account) => {
        setSelectedAccount(account);
        setShowModal(true);
    };

    const handleDelete = async (numeroCuenta) => {
        if (!window.confirm("¿Estás seguro de cerrar esta cuenta?")) return;
        try {
            await deleteAccount(numeroCuenta);
            showSuccess("Cuenta cerrada correctamente");
        } catch (error) {
            const message = error.response?.data?.message || "Error al cerrar la cuenta";
            showError(message);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAccount(null);
    };

    return (
        <div className="p-8 w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Cuentas Bancarias</h1>
                        <p className="text-slate-400 text-sm">Administra las cuentas de ahorro y monetarias</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => { setSelectedAccount(null); setShowModal(true); }}
                            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-5 py-2.5 rounded-xl text-white font-semibold transition-all shadow-lg shadow-emerald-500/30"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Aperturar Cuenta
                        </button>

                        <button
                            onClick={getAccounts}
                            disabled={loading}
                            className="p-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-emerald-400 transition-all"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* LISTA DE CUENTAS */}
                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-700/30 text-slate-400 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold">Cuenta</th>
                                    <th className="px-6 py-4 font-semibold">Titular</th>
                                    <th className="px-6 py-4 font-semibold">Tipo</th>
                                    <th className="px-6 py-4 font-semibold">Saldo Disponible</th>
                                    <th className="px-6 py-4 font-semibold">Estado</th>
                                    <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {loading && accounts.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" />
                                            Cargando cuentas...
                                        </td>
                                    </tr>
                                ) : accounts.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-500 italic">
                                            No hay cuentas registradas.
                                        </td>
                                    </tr>
                                ) : (
                                    accounts.map((account, index) => (
                                        <tr key={`${account.numero_cuenta || 'no-acc'}-${index}`} className="group hover:bg-slate-700/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-emerald-400 border border-slate-600">
                                                        <Wallet className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-mono text-sm tracking-wider">{account.numero_cuenta}</p>
                                                        <p className="text-[10px] text-slate-500 uppercase font-bold">Copia para depósitos</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-slate-300 text-sm font-medium">{account.nombre_cuenta || `Usuario #${account.usuario_id}`}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 text-[10px] rounded-lg font-bold border ${account.tipo_cuenta === "Monetaria" || account.tipo_cuenta === "MONETARIA"
                                                        ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                        : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                                    }`}>
                                                    {account.tipo_cuenta || "—"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <span className="text-emerald-500 font-bold text-xs">Q</span>
                                                    <span className="text-white font-bold text-base">
                                                        {parseFloat(account.balance || 0).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${account.estado === "Activa" ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                                                    <span className={`text-xs font-semibold ${account.estado === "Activa" ? "text-emerald-400" : "text-red-400"}`}>
                                                        {account.estado || "—"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => handleEdit(account)} className="p-2 rounded-lg hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all" title="Editar">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(account.numero_cuenta)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all" title="Cerrar Cuenta">
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {showModal && (
                    <AccountModal
                        isOpen={showModal}
                        onClose={handleCloseModal}
                        account={selectedAccount}
                        onSaved={getAccounts}
                    />
                )}
            </div>
        </div>
    );
};
