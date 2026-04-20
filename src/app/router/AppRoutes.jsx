import { Routes, Route } from "react-router-dom"
import { AuthPage } from "../../features/auth/pages/AuthPage";
import { DashboardPage } from "../layouts/DashboardPage";
export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />

            {/* Protegido por rol */}
            <Route path="/dashboard/*" element={<DashboardPage />} />

            {/* Ruta temporal para pruebas */}
            <Route path="*" element={<h1>Pagina no encontrada</h1>} />
        </Routes>
    );
}