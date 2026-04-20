import { Accounts } from "../../../features/accounts/components/Accounts";
import { Users } from "../../../features/users/components/Users";
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

                <main className="flex-1 p-6 text-[#475569] overflow-y-auto">
                    <div className="w-full min-h-full border-2 border-dashed border-slate-200 rounded-3xl p-4">
                        <Users />
                    </div>
                    <div className="w-full min-h-full border-2 border-dashed border-slate-200 rounded-3xl p-4">
                        <Accounts />
                    </div>
                </main>

            </div>
        </div>
    );
}
