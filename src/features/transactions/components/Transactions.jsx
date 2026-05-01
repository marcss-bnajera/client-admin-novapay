import { useState } from "react";
import { 
    Search, 
    ArrowUpCircle, 
    ArrowDownCircle, 
    RefreshCcw, 
    TrendingUp, 
    TrendingDown, 
    Hash, 
    CreditCard, 
    Calendar
} from "lucide-react";

export const Transactions = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");

    // Datos simulados
    const transactions = [
        { id: 901, account_id: 1020, type: "deposit", amount: 2500.00, description: "Depósito en efectivo", balance_after: 5000.00, createdAt: "2026-05-01T09:00:00" },
        { id: 902, account_id: 1020, type: "withdraw", amount: 200.00, description: "Retiro Cajero", balance_after: 4800.00, createdAt: "2026-05-01T10:30:00" },
        { id: 903, account_id: 3045, type: "transfer_in", amount: 1200.00, description: "Transferencia Recibida", balance_after: 3200.00, createdAt: "2026-05-01T11:00:00" },
        { id: 904, account_id: 1020, type: "transfer_out", amount: 1200.00, description: "Pago de servicios", balance_after: 3600.00, createdAt: "2026-05-01T11:00:00" },
    ];

    // Búsqueda + Tipo de Transacción
    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.account_id.toString().includes(searchTerm) || 
                             t.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === "all" || t.type === filterType;
        return matchesSearch && matchesType;
    });

    const getTypeStyles = (type) => {
        switch (type) {
            case "deposit": return { icon: <TrendingUp className="w-4 h-4" />, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", label: "Depósito" };
            case "transfer_in": return { icon: <ArrowDownCircle className="w-4 h-4" />, color: "text-blue-400 bg-blue-500/10 border-blue-500/20", label: "Transf. Entrante" };
            case "withdraw": return { icon: <TrendingDown className="w-4 h-4" />, color: "text-rose-400 bg-rose-500/10 border-rose-500/20", label: "Retiro" };
            case "transfer_out": return { icon: <ArrowUpCircle className="w-4 h-4" />, color: "text-amber-400 bg-amber-500/10 border-amber-500/20", label: "Transf. Saliente" };
            default: return { icon: <RefreshCcw className="w-4 h-4" />, color: "text-slate-400 bg-slate-500/10 border-slate-500/20", label: "Otro" };
        }
    };

    return (
        <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto">
                
                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Historial de Transacciones</h1>
                        <p className="text-slate-400 text-sm italic">Auditoría en tiempo real de todos los movimientos de capital</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar por cuenta o concepto..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all w-72"
                            />
                        </div>
                        
                        <select 
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="bg-slate-800 border border-slate-700 text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        >
                            <option value="all">Todos los tipos</option>
                            <option value="deposit">Depósitos</option>
                            <option value="withdraw">Retiros</option>
                            <option value="transfer_in">Entradas</option>
                            <option value="transfer_out">Salidas</option>
                        </select>
                    </div>
                </div>

                {/* TABLA */}
                <div className="bg-slate-800/40 backdrop-blur-md rounded-2xl border border-slate-700/50 overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-700/30 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                                <th className="px-6 py-4 flex items-center gap-2"><Hash className="w-3.5 h-3.5" /> ID</th>
                                <th className="px-6 py-4"><div className="flex items-center gap-2"><CreditCard className="w-3.5 h-3.5" /> Cuenta</div></th>
                                <th className="px-6 py-4">Tipo de Movimiento</th>
                                <th className="px-6 py-4 text-right">Monto</th>
                                <th className="px-6 py-4 text-right">Saldo Resultante</th>
                                <th className="px-6 py-4"><div className="flex items-center gap-2 justify-end"><Calendar className="w-3.5 h-3.5" /> Fecha</div></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {filteredTransactions.map((tx) => {
                                const style = getTypeStyles(tx.type);
                                const isNegative = tx.type === "withdraw" || tx.type === "transfer_out";

                                return (
                                    <tr key={tx.id} className="group hover:bg-slate-700/20 transition-all">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-500">#{tx.id}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-white font-semibold">ACC-{tx.account_id}</span>
                                            <p className="text-[10px] text-slate-500 truncate w-32">{tx.description}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase ${style.color}`}>
                                                {style.icon}
                                                {style.label}
                                            </div>
                                        </td>
                                        <td className={`px-6 py-4 text-right font-bold font-mono ${isNegative ? "text-rose-400" : "text-emerald-400"}`}>
                                            {isNegative ? "-" : "+"}Q{tx.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-slate-300 font-mono text-sm">Q{tx.balance_after.toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-xs text-slate-500 font-medium">
                                            {new Date(tx.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};