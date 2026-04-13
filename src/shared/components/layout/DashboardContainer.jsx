import { Navbar } from "./Navbar"
import { Sidebar } from "./Sidebar";

export const DashoardContainer = () => {

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
            {/* NavBar */}
            <Navbar />

            <div className="flex flex-1 w-full  mx-auto">
                {/* Sidebar */}
                <Sidebar />

                <main className="flex-1 p-6 text-[#475569]">
                    <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-3xl flex items-center justify-center text-[#94A3B8]">
                        Área de Contenido (Responsive)
                    </div>
                </main>
            </div>
        </div>
    );
}