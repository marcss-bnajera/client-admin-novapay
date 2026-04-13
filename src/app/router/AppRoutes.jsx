import { Routes, Route } from "react-router-dom"
import { DashboardPage } from "../layouts/DashboardPage";
export const AppRoutes = () => {
    return (
        <Routes>

            {/* Protegido por rol */}
            <Route path="/dashboard/*" element={<DashboardPage />} />

        </Routes>
    );
}