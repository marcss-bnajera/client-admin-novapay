import { create } from "zustand";
import {
    getShoppings as getShoppingsRequest,
    createShopping as createShoppingRequest,
    deleteShopping as deleteShoppingRequest,
} from "../../../shared/api";

export const useShoppingsStore = create((set, get) => ({
    shoppings: [],
    loading: false,
    error: null,

    getShoppings: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getShoppingsRequest();
            const data = response.data?.data || response.data?.shoppings || response.data || [];
            set({ shoppings: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener compras", loading: false });
            throw error;
        }
    },

    createShopping: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await createShoppingRequest(data);
            const newShopping = response.data?.data || response.data;
            set({ shoppings: [newShopping, ...get().shoppings], loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear compra" });
            throw error;
        }
    },

    deleteShopping: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteShoppingRequest(id);
            set({ shoppings: get().shoppings.filter((s) => s.id !== id && s._id !== id), loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar compra" });
            throw error;
        }
    },
}));
