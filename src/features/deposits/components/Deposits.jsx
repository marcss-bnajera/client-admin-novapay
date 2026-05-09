import { useState, useEffect } from "react";
import { DepositModal } from "./DepositModal.jsx";
import { useDepositsStore } from "../store/depositsStore";
import { Search, PlusCircle, CreditCard, RefreshCw } from "lucide-react";

export const Deposits = () => {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const { deposits, loading, getDeposits } = useDepositsStore();

    useEffect(() => {
        getDeposits();
    }, []);

    const filteredDeposits = deposits.filter((d) => {
        const term = searchTerm.toLowerCase();
        const numeroCuenta = d.account?.numero_cuenta || String(d.cuenta_id || "");
        return (
            String(d.id || "").includes(term) ||
            numeroCuenta.includes(term)
        );
    });

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Historial de Depósitos</h1>
                        <p className="text-slate-400 text-sm">Gestiona y registra las entradas de efectivo en NovaPay</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Buscar por ID o Cuenta..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all w-full sm:w-64"
                            />
                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-5 py-2.5 rounded-xl text-white font-semibold transition-all shadow-lg shadow-emerald-500/30"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Nuevo Depósito
                        </button>

                        <button onClick={getDeposits} disabled={loading} className="p-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-400 hover:text-emerald-400 transition-all">
                            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>

                {/* TABLA DE DEPÓSITOS */}
                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-700/30 text-slate-400 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-semibold text-center">ID Transacción</th>
                                    <th className="px-6 py-4 font-semibold">No. de Cuenta</th>
                                    <th className="px-6 py-4 font-semibold">Monto</th>
                                    <th className="px-6 py-4 font-semibold">Fecha y Hora</th>
                                    <th className="px-6 py-4 font-semibold text-center">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {loading && filteredDeposits.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" />
                                            Cargando depósitos...
                                        </td>
                                    </tr>
                                ) : filteredDeposits.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500 italic">
                                            No se encontraron depósitos.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDeposits.map((deposit) => (
                                        <tr key={deposit.id} className="group hover:bg-slate-700/20 transition-colors">
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-slate-400 font-mono text-sm">#{deposit.id}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                                        <CreditCard className="w-4 h-4" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-mono text-sm">{deposit.account?.numero_cuenta || "—"}</p>
                                                        <p className="text-slate-500 text-xs">{deposit.account?.nombre_cuenta || ""}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-emerald-400 font-bold text-sm">Q {parseFloat(deposit.monto || 0).toFixed(2)}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-slate-300 text-sm">{new Date(deposit.fecha || deposit.createdAt).toLocaleDateString("es-GT")}</span>
                                                    <span className="text-slate-500 text-xs">{new Date(deposit.fecha || deposit.createdAt).toLocaleTimeString("es-GT")}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="px-2.5 py-1 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                                                    {deposit.estado || "COMPLETADO"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {showModal && (
                    <DepositModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onSaved={getDeposits}
                    />
                )}
            </div>
        </div>
    );
};
