import imgLogo from "../../../assets/img/logo_novapay_signo.png";
import { ChevronDown } from "lucide-react";
import { AvatarUser } from "../../ui/AvatarUser";
import { useAuthStore } from "../../../features/auth/store/authStore";

export const Navbar = () => {
    const { user } = useAuthStore();

    return (
        <nav className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] sticky top-0 z-50 border-b border-emerald-500/20 shadow-xl">
            <div className="max-w-full mx-auto px-8 h-24 flex items-center justify-between">

                {/* LOGO */}
                <div className="flex items-center gap-6 group">
                    <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <img
                            src={imgLogo}
                            alt="NovaPay Logo"
                            className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                        />
                    </div>
                    <div className="flex flex-col border-l border-slate-700/50 pl-6 h-12 justify-center">
                        <span className="text-white font-black text-2xl tracking-tighter leading-none">
                            NOVA<span className="text-emerald-400">PAY</span>
                        </span>
                        <span className="text-emerald-500/80 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                            Sistema Bancario
                        </span>
                    </div>
                </div>

                {/* seccion de la izquierda */}
                <div className="flex items-center gap-4">
                    <div className="h-10 w-px bg-slate-700/50" />

                    {/* USER */}
                    <div className="flex items-center gap-3 hover:bg-slate-800/30 rounded-xl px-3 py-2 transition-all group">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-bold text-white">{user?.username ?? "Usuario"}</span>
                            <span className="text-xs text-emerald-400 font-medium tracking-wide">Panel de Control</span>
                        </div>
                        <AvatarUser />
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                </div>
            </div>
        </nav>
    );
};