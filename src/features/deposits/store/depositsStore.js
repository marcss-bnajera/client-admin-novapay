import { create } from "zustand";
import {
    getDeposits as getDepositsRequest,
    createDeposit as createDepositRequest,
} from "../../../shared/api";

export const useDepositsStore = create((set, get) => ({
    deposits: [],
    loading: false,
    error: null,

    getDeposits: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getDepositsRequest();
            const data = response.data?.data || response.data?.deposits || response.data || [];
            set({ deposits: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener depósitos", loading: false });
            throw error;
        }
    },

    createDeposit: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await createDepositRequest(data);
            const newDeposit = response.data?.data || response.data;
            set({ deposits: [newDeposit, ...get().deposits], loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear depósito" });
            throw error;
        }
    },
}));
