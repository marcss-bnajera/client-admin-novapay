import { Accounts } from "../../../features/accounts/components/Accounts";
import { Users } from "../../../features/users/components/Users";
import { Deposits } from "../../../features/deposits/components/Deposits";
import { Cards } from "../../../features/cards/components/Cards";
import { Passbooks } from "../../../features/passbooks/components/Passbooks";
import { Products } from "../../../features/products/components/Products";
import { Transfers } from "../../../features/transfers/components/Transfers";
import { Transactions } from "../../../features/transactions/components/Transactions";
import { Shopping } from "../../../features/shoppings/components/Shopping";
import { Currencies } from "../../../features/currencies/components/Currencies";
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
                    <Deposits />
                    <Cards />
                    <Passbooks />
                    <Products />
                    <Transfers />
                    <Transactions />
                    <Shopping />
                    <Currencies />
                </main>
            </div>
        </div>
    );
}