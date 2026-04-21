import imgLogo from "../../../assets/img/logo_novapay.png";
import { Bell, Search, Settings, ChevronDown } from "lucide-react";

export const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] sticky top-0 z-50 border-b border-emerald-500/20 shadow-xl">
            <div className="max-w-full mx-auto px-8 h-20 flex items-center justify-between">
                {/* LOGO AREA */}
                <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-br from-emerald-400 to-teal-600 p-3 rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img
                                src={imgLogo}
                                alt="NovaPay Logo"
                                className="h-10 md:h-12 w-auto object-contain"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-emerald-400 text-xs font-semibold tracking-wide">Sistema Bancario</span>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex items-center gap-4">
                    {/* Divider */}
                    <div className="h-10 w-px bg-slate-700/50"></div>

                    {/* USER PROFILE */}
                    <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800/30 rounded-xl px-3 py-2 transition-all group">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-bold text-white">Admin Usuario</span>
                            <span className="text-xs text-emerald-400 font-medium">Panel de Control</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all border-2 border-slate-700">
                            <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                </div>
            </div>
        </nav>
    );
};
