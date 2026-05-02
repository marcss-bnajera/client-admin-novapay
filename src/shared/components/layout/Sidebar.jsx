import { Link, useLocation } from "react-router-dom";
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
    const location = useLocation();

    const items = [
        { label: "Inicio", icon: Home, to: "/dashboard/home" },
        { label: "Usuarios", icon: Users, to: "/dashboard/users" },
        { label: "Cuentas", icon: Wallet, to: "/dashboard/accounts" },
        { label: "Depositos", icon: PiggyBank, to: "/dashboard/deposits" },
        { label: "Tarjetas", icon: CreditCard, to: "/dashboard/cards" },
        { label: "Libretas", icon: BookCopy, to: "/dashboard/passbooks" },
        { label: "Productos", icon: Package, to: "/dashboard/products" },
        { label: "Transferencias", icon: Send, to: "/dashboard/transfers" },
        { label: "Transacciones", icon: Receipt, to: "/dashboard/transactions" },
        { label: "Compras", icon: ShoppingCart, to: "/dashboard/shoppings" },
        { label: "Divisas", icon: DollarSign, to: "/dashboard/currencies" },
    ];

    return (
        <aside className="w-72 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] h-screen sticky top-0 shadow-2xl overflow-hidden border-r border-slate-700/50 flex flex-col">
            {/* Decoraciones de fondo */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 -right-32 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Navegación*/}
            <nav className="flex-1 px-4 pb-4 overflow-y-auto relative z-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <ul className="space-y-1.5">
                    {items.map((item) => {
                        const isActive = location.pathname === item.to;
                        const Icon = item.icon;

                        return (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    className={`
                                        relative flex items-center gap-4 px-5 py-3.5 rounded-xl font-semibold transition-all duration-300 group
                                        ${isActive
                                            ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 scale-[1.02]"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                                        }
                                    `}
                                >
                                    {Icon && (
                                        <div className={`
                                            p-2 rounded-lg transition-all
                                            ${isActive
                                                ? "bg-white/20"
                                                : "bg-slate-700/30 group-hover:bg-slate-700/50 text-slate-400 group-hover:text-emerald-400"
                                            }
                                        `}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                    )}
                                    
                                    <span className="text-sm tracking-wide flex-1">{item.label}</span>

                                    {isActive ? (
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
                                    ) : (
                                        <div className="w-1 h-1 bg-emerald-500 opacity-0 group-hover:opacity-100 rounded-full transition-all"></div>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};