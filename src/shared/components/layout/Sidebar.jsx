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
        <aside className="w-64 bg-[#F1F5F9] min-h-[calc(100vh-4rem)] p-4 border-r border-white">
            <ul className="space-y-3"> {/* Aumenté el espacio entre elementos de 1 a 3 */}
                {items.map((item) => {
                    const isActive = item.label === active;

                    return (
                        <li key={item.label}>
                            <div
                                className={`
                                relative flex items-center gap-4 px-4 py-3 rounded-xl font-semibold cursor-pointer transition-all
                                    ${isActive
                                        ? "text-[#1E293B] bg-white shadow-sm border-l-4 border-[#CD9B67]"
                                        : "text-[#475569] hover:bg-white/60"
                                    }
                                `}
                            >
                                {item.icon && (
                                    <img
                                        src={item.icon}
                                        alt={item.label}
                                        className="w-8 h-8 object-contain" // Iconos más grandes (32px)
                                    />
                                )}
                                <span className="text-lg">{item.label}</span> {/* Texto un poco más grande */}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};