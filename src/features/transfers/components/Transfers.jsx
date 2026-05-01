import { useState } from "react";
import { Search, ArrowRightLeft, ArrowRight, Calendar, Hash, DollarSign, FileText } from "lucide-react";

export const Transfers = () => {
    // Estado para la búsqueda
    const [searchTerm, setSearchTerm] = useState("");

    // Datos simulados
    const transfers = [
        { id: 5001, account_origin_id: 1020, account_destination_id: 3045, amount: 1200.00, description: "Pago de servicios", date: "2026-05-01T10:30:00" },
        { id: 5002, account_origin_id: 3045, account_destination_id: 1020, amount: 450.75, description: "Transferencia familiar", date: "2026-04-28T14:15:00" }
    ];

    // Lógica de filtrado usando el searchTerm
    const filteredTransfers = transfers.filter(t => 
        t.account_origin_id.toString().includes(searchTerm) ||
        t.account_destination_id.toString().includes(searchTerm) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <ArrowRightLeft className="text-emerald-400 w-8 h-8" />
                            Historial de Transferencias
                        </h1>
                        <p className="text-slate-400 text-sm">Monitoreo global de movimientos entre cuentas NovaPay</p>
                    </div>

                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Filtrar movimientos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all w-64"
                            />
                        </div>
                    </div>
                </div>

                {/* TABLA DE TRANSFERENCIAS */}
                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-700/30 text-slate-400 text-[11px] uppercase tracking-[0.1em]">
                                    <th className="px-6 py-4 font-bold"><div className="flex items-center gap-2"><Hash className="w-3.5 h-3.5" /> ID</div></th>
                                    <th className="px-6 py-4 font-bold text-center">Flujo de Cuentas</th>
                                    <th className="px-6 py-4 font-bold"><div className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" /> Monto</div></th>
                                    <th className="px-6 py-4 font-bold"><div className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Concepto</div></th>
                                    <th className="px-6 py-4 font-bold"><div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Fecha</div></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {filteredTransfers.length > 0 ? (
                                    filteredTransfers.map((t) => (
                                        <tr key={t.id} className="group hover:bg-slate-700/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="text-slate-500 font-mono text-sm group-hover:text-emerald-400">#{t.id}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <span className="bg-slate-900/80 border border-slate-700 px-3 py-1 rounded-lg text-white font-mono text-xs">{t.account_origin_id}</span>
                                                    </div>
                                                    <ArrowRight className="w-4 h-4 text-emerald-500" />
                                                    <div className="flex flex-col items-center">
                                                        <span className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg text-emerald-400 font-mono text-xs font-bold">{t.account_destination_id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-white font-mono">Q{t.amount.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-sm text-slate-300">{t.description}</td>
                                            <td className="px-6 py-4 text-xs text-slate-500">{new Date(t.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500 italic">
                                            No se encontraron transferencias con esos criterios.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};