import { useState } from "react";
import { AccountModal } from "./AccountModal";
import { TrendingUp, PlusCircle, Edit, XCircle, Wallet, DollarSign, ArrowUpRight } from "lucide-react";

export const Accounts = () => {
    const [showModal, setShowModal] = useState(false);

    const accounts = [
        {
            id: 1,
            accountNumber: "4509-2234-11",
            type: "Monetaria",
            balance: 15250.00,
            owner: "Juan Pérez",
            status: "Activa"
        },
        {
            id: 2,
            accountNumber: "4509-8821-45",
            type: "Ahorro",
            balance: 28750.50,
            owner: "Marcos Beteta",
            status: "Activa"
        }
    ];

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
                        <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-emerald-500/50 text-emerald-400 rounded-xl font-semibold hover:bg-emerald-500/10 hover:border-emerald-500 transition-all">
                            <TrendingUp className="w-5 h-5" />
                            Mayor Actividad
                        </button>

                        <button
                            onClick={() => setShowModal(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-5 py-2.5 rounded-xl text-white font-semibold transition-all shadow-lg shadow-emerald-500/30"
                        >
                            <PlusCircle className="w-5 h-5" />
                            Aperturar Cuenta
                        </button>
                    </div>
                </div>

                {/* LISTA DE CUENTAS (TABLA) */}
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
                                {accounts.map((account) => (
                                    <tr key={account.id} className="group hover:bg-slate-700/20 transition-colors">

                                        {/* NÚMERO DE CUENTA */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-emerald-400 border border-slate-600">
                                                    <Wallet className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-mono text-sm tracking-wider">{account.accountNumber}</p>
                                                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">ID: {account.id.toString().padStart(4, '0')}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* TITULAR */}
                                        <td className="px-6 py-4">
                                            <span className="text-slate-300 text-sm font-medium">{account.owner}</span>
                                        </td>

                                        {/* TIPO DE CUENTA */}
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 text-[10px] rounded-lg font-bold border ${account.type === "Monetaria"
                                                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                : "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                                }`}>
                                                {account.type}
                                            </span>
                                        </td>

                                        {/* SALDO */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-emerald-500 font-bold text-xs">Q</span>
                                                <span className="text-white font-bold text-base">
                                                    {account.balance.toLocaleString('es-GT', { minimumFractionDigits: 2 })}
                                                </span>
                                            </div>
                                        </td>

                                        {/* ESTADO */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                                <span className="text-emerald-400 text-xs font-semibold">{account.status}</span>
                                            </div>
                                        </td>

                                        {/* ACCIONES */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 rounded-lg hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-all" title="Editar Cuenta">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all" title="Cerrar Cuenta">
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-all" title="Ver Movimientos">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {showModal && <AccountModal isOpen={showModal} onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
};
