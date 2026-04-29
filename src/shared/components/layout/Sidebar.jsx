import HomeIcon from "../../../assets/icons/home.png"
//import Users from "../../../assets/icons/users.png"
import accounts from "../../../assets/icons/account.png"
import deposits from "../../../assets/icons/deposits.png"
import cards from "../../../assets/icons/cards.png"
import product from "../../../assets/icons/product.png"
import Compras from "../../../assets/icons/compras.png"
import exchange from "../../../assets/icons/exchange.png"
import send from "../../../assets/icons/send.png"
import cash from "../../../assets/icons/cash.png"
import {
    Home,
    Users,
    Wallet,
    PiggyBank,
    CreditCard,
    Package,
    Send,
    Receipt,
    ShoppingCart,
    DollarSign,
    BookCopy
} from "lucide-react";

export const Sidebar = () => {
    const items = [
        { label: "Inicio", icon: Home },
        { label: "Usuarios", icon: Users },
        { label: "Cuentas", icon: Wallet },
        { label: "Depositos", icon: PiggyBank },
        { label: "Tarjetas", icon: CreditCard },
        { label: "Libretas", icon: BookCopy },
        { label: "Productos", icon: Package },
        { label: "Transferencias", icon: Send },
        { label: "Transacciones", icon: Receipt },
        { label: "Compras", icon: ShoppingCart },
        { label: "Divisas", icon: DollarSign },
    ];

    const active = "Inicio";

    return (
        <aside className="w-72 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] min-h-[calc(100vh-5rem)] shadow-2xl relative overflow-hidden border-r border-slate-700/50">
            {/* Decoraciones de fondo */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -right-32 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>

            {/* Header de Sidebar */}
            <div className="p-6 border-b border-slate-700/50 relative z-10">
                <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl p-4 border border-slate-600/30">
                    <p className="text-slate-400 text-xs font-semibold mb-1">MENÚ PRINCIPAL</p>
                    <p className="text-white text-sm font-bold">Navegación</p>
                </div>
            </div>

            <ul className="p-4 space-y-2 relative z-10">
                {items.map((item) => {
                    const isActive = item.label === active;
                    const Icon = item.icon;

                    return (
                        <li key={item.label}>
                            <div
                                className={`
                                    relative flex items-center gap-4 px-5 py-3.5 rounded-xl font-semibold cursor-pointer transition-all duration-300 group
                                    ${isActive
                                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 scale-[1.02]"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                    }
                                `}
                            >
                                {Icon && (
                                    <div className={`
                                        p-2 rounded-lg transition-all
                                        ${isActive
                                            ? "bg-white/20"
                                            : "bg-slate-700/30 group-hover:bg-slate-700/50"
                                        }
                                    `}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                )}
                                <span className="text-sm tracking-wide flex-1">{item.label}</span>

                                {isActive && (
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
                                )}

                                {!isActive && (
                                    <div className="w-1 h-1 bg-emerald-500/0 group-hover:bg-emerald-500 rounded-full transition-all"></div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};
