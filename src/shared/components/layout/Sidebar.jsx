import HomeIcon from "../../../assets/icons/home.png"
import Users from "../../../assets/icons/users.png"
import accounts from "../../../assets/icons/account.png"
import deposits from "../../../assets/icons/deposits.png"
import cards from "../../../assets/icons/cards.png"
import product from "../../../assets/icons/product.png"
import Compras from "../../../assets/icons/compras.png"
import exchange from "../../../assets/icons/exchange.png"
import send from "../../../assets/icons/send.png"
import cash from "../../../assets/icons/cash.png"

export const Sidebar = () => {
    const items = [
        { label: "Inicio", icon: HomeIcon },
        { label: "Usuarios", icon: Users },
        { label: "Cuentas", icon: accounts },
        { label: "Depositos", icon: deposits },
        { label: "Tarjetas", icon: cards },
        { label: "Productos", icon: product },
        { label: "Transferencias", icon: send },
        { label: "Transacciones", icon: cash },
        { label: "Compras", icon: Compras },
        { label: "Divisas", icon: exchange },
    ];

    const active = "Inicio";

    return (
        <aside className="w-72 bg-[#0f172a] min-h-[calc(100vh-5rem)] p-6 shadow-2xl relative overflow-hidden">
            {/* Decoración de fondo para que no se mire vacío */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#CD9B67]/10 rounded-full blur-3xl"></div>

            <ul className="space-y-4 relative z-10">
                {items.map((item) => {
                    const isActive = item.label === active;

                    return (
                        <li key={item.label}>
                            <div
                                className={`
                                    relative flex items-center gap-4 px-5 py-3.5 rounded-2xl font-bold cursor-pointer transition-all duration-300
                                    ${isActive
                                        ? "text-white bg-gradient-to-r from-[#CD9B67] to-[#b08554] shadow-lg shadow-[#CD9B67]/20 scale-[1.02]"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }
                                `}
                            >
                                {item.icon && (
                                    <img
                                        src={item.icon}
                                        alt={item.label}
                                        className={`w-7 h-7 object-contain transition-all ${isActive ? "brightness-0 invert" : "opacity-70 group-hover:opacity-100"
                                            }`}
                                    />
                                )}
                                <span className="text-base tracking-wide">{item.label}</span>

                                {isActive && (
                                    <div className="absolute right-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};