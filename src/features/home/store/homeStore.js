import { create } from "zustand";
import { Users, ShieldCheck, Activity, Briefcase } from "lucide-react";

export const useDashboardStore = create((set, get) => ({
    stats: [],
    chartData: [40, 70, 55, 85, 60, 45, 90],
    currencyData: [],
    alerts: [],
    loading: false,
    error: null,

    fetchDashboardData: async () => {
        try {
            set({ loading: true, error: null });

            const response = await fetch(`${import.meta.env.VITE_ADMIN_URL}/dashboard/home`);
            if (!response.ok) throw new Error("Error al obtener los datos del servidor");

            const data = await response.json();

            const formattedStats = [
                {
                    label: "Usuarios Totales",
                    value: (data.stats?.totalUsers || 0).toLocaleString(),
                    grow: `+${data.stats?.usersGrow || 0}%`,
                    icon: Users,
                    color: "text-blue-400"
                },
                {
                    label: "Liquidez Global",
                    value: `Q${(data.stats?.totalMoneyInBank || 0).toLocaleString()}`,
                    grow: `+${data.stats?.liquidityGrow || 0}%`,
                    icon: Briefcase,
                    color: "text-emerald-400"
                },
                {
                    label: "Transacciones Totales",
                    value: (data.stats?.totalTransfers || 0).toLocaleString(),
                    grow: `+${data.stats?.transactionsGrow || 0}%`,
                    icon: Activity,
                    color: "text-amber-400"
                },
                {
                    label: "Alertas de Riesgo",
                    value: (data.alerts?.length || 0).toString(),
                    grow: data.stats?.riskStatus || "Estable",
                    icon: ShieldCheck,
                    color: "text-rose-400"
                },
            ];

            const serverCurrencies = data.currencies || [];

            const formattedCurrencies = serverCurrencies.map((c) => {

                const code = c.symbol || c.simbolo || "USD";
                const name = c.currency || c.nombre || "Divisa";
                const rate = parseFloat(c.rate || c.tasa || 1);

                const fakeVolume = rate > 1 ? `Q ${(rate * 10).toFixed(0)}k` : `Q 50k`;
                const fakePercentage = Math.min(Math.max((rate * 10), 15), 100); // Mantiene la barra entre 15% y 100%

                return {
                    coin: `${code} - ${name}`,
                    vol: fakeVolume,
                    perc: `${fakePercentage}%`,
                    trend: rate >= 1 ? "up" : "down"
                };
            });

            const finalCurrencyData = formattedCurrencies.length > 0
                ? formattedCurrencies
                : [{ coin: "GTQ - Quetzal", vol: "Q 150k", perc: "100%", trend: "up" }];

            set({
                stats: formattedStats,
                chartData: data.chartData || get().chartData,
                currencyData: finalCurrencyData,
                alerts: data.alerts || [],
                loading: false
            });

        } catch (err) {
            console.error(err);
            set({ error: err.message, loading: false });
        }
    }
}));