import imgLogo from "../../../assets/img/logo_novapay.png";

export const Navbar = () => {
    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b-2 border-[#CD9B67]/20 shadow-sm">
            <div className="max-w-full mx-auto px-8 h-20 flex items-center justify-between">

                {/* LOGO AREA */}
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="bg-slate-50 p-2 rounded-xl group-hover:scale-105 transition-transform shadow-inner">
                        <img
                            src={imgLogo}
                            alt="NovaPay Logo"
                            className="h-10 md:h-12 w-auto object-contain"
                        />
                    </div>
                </div>

                {/* USER PROFILE AREA */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end mr-2">
                        <span className="text-sm font-bold text-[#1e293b]">Admin Usuario</span>
                        <span className="text-xs text-[#CD9B67] font-medium">Panel de Control</span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#CD9B67] to-[#b08554] flex items-center justify-center shadow-lg shadow-[#CD9B67]/30 cursor-pointer hover:rotate-3 transition-all border-2 border-white">
                        <span className="text-white font-bold text-lg">A</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};