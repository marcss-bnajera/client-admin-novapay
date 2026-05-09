import { create } from "zustand";
import { getTransfers as getTransfersRequest } from "../../../shared/api";

export const useTransfersStore = create((set) => ({
    transfers: [],
    loading: false,
    error: null,

    getTransfers: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getTransfersRequest();
            const data = response.data?.data || response.data?.transfers || response.data || [];
            set({ transfers: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener transferencias", loading: false });
            throw error;
        }
    },
}));
