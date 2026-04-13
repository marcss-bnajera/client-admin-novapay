import imgLogo from "../../../assets/img/logo_novapay.png";

export const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-[#F1F5F9]">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                <div className="flex items-center gap-2">
                    <img
                        src={imgLogo}
                        alt="Kinal Sports Logo"
                        className="h-1 md:h-21 w-auto object-contain"
                    />

                    <h1 className="font-bold text-[#475569] text-lg">
                    </h1>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#CD9B67]" />
            </div>
        </nav>
    );
};