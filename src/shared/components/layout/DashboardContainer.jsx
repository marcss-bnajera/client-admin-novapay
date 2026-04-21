import { Accounts } from "../../../features/accounts/components/Accounts";
import { Users } from "../../../features/users/components/Users";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export const DashoardContainer = () => {
    return (
        <div className="min-h-screen bg-[#0F172A] flex flex-col w-full">

            {/* NavBar */}
            <Navbar />

            <div className="flex flex-1 w-full mx-0">
                <Sidebar />

                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <Users />
                    <Accounts />
                </main>
            </div>
        </div>
    );
}