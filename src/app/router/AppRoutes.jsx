import { Routes, Route } from "react-router-dom"
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { DashboardPage } from "../layouts/DashboardPage";
import { Home } from "../../features/home/components/Home";
import { Users } from "../../features/users/components/Users";
import { Accounts } from "../../features/accounts/components/Accounts";
import { Deposits } from "../../features/deposits/components/Deposits";
import { Cards } from "../../features/cards/components/Cards";
import { Passbooks } from "../../features/passbooks/components/Passbooks";
import { Products } from "../../features/products/components/Products";
import { Transfers } from "../../features/transfers/components/Transfers";
import { Transactions } from "../../features/transactions/components/Transactions";
import { Shopping } from "../../features/shoppings/components/Shopping";
import { Currencies } from "../../features/currencies/components/Currencies";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />

            {/* Protegido por rol */}
            <Route path="/dashboard/*" element={<DashboardPage />} >
                <Route path="home" element={<Home />} />
                <Route path="users" element={<Users />} />
                <Route path="accounts" element={<Accounts />} />
                <Route path="deposits" element={<Deposits />} />
                <Route path="cards" element={<Cards />} />
                <Route path="passbooks" element={<Passbooks />} />
                <Route path="products" element={<Products />} />
                <Route path="transfers" element={<Transfers />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="shoppings" element={<Shopping />} />
                <Route path="currencies" element={<Currencies />} />
            </Route>

            {/* Ruta temporal para pruebas */}
            <Route path="*" element={<h1>Pagina no encontrada</h1>} />
        </Routes>
    );
}