import { useState } from "react";
import { DepositModal } from "./DepositModal.jsx";
import { Search, PlusCircle, ArrowDownCircle, Calendar, Hash, CreditCard, MoreVertical } from "lucide-react";

export const Deposits = () => {
    const [showModal, setShowModal] = useState(false);

    const deposits = [
        {
            id: 101,
            cuenta_id: 50201,
            monto: 2500.00,
            fecha: "2026-04-28T10:30:00",
            estado: "COMPLETADO"
        },
        {
            id: 102,
            cuenta_id: 50205,
            monto: 125.50,
            fecha: "2026-04-28T14:15:00",
            estado: "COMPLETADO"
        }
    ];

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
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all w-full sm:w-64"
                            />
                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-5 py-2.5 rounded-xl text-white font-semibold transition-all shadow-lg shadow-emerald-500/30"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Nuevo Depósito
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
                                    <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {deposits.map((deposit) => (
                                    <tr key={deposit.id} className="group hover:bg-slate-700/20 transition-colors">
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-slate-400 font-mono text-sm">#{deposit.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                                    <CreditCard className="w-4 h-4" />
                                                </div>
                                                <span className="text-white font-medium text-sm">{deposit.cuenta_id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-emerald-400 font-bold text-sm">Q {deposit.monto.toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-slate-300 text-sm">{new Date(deposit.fecha).toLocaleDateString()}</span>
                                                <span className="text-slate-500 text-xs">{new Date(deposit.fecha).toLocaleTimeString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-2.5 py-1 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                                                {deposit.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 transition-all">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {showModal && <DepositModal isOpen={showModal} onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
};