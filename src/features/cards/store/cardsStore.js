import { create } from "zustand";
import {
    getCards as getCardsRequest,
    createCard as createCardRequest,
    deleteCard as deleteCardRequest,
    updateCard as updateCardRequest
} from "../../../shared/api";

export const useCardsStore = create((set, get) => ({
    cards: [],
    loading: false,
    error: null,

    getCards: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getCardsRequest();
            const data = response.data?.data || response.data?.cards || response.data || [];
            set({ cards: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener tarjetas", loading: false });
            throw error;
        }
    },

    createCard: async (data) => {
        try {
            set({ loading: true, error: null });

            // El controlador espera 'numero_cuenta', nada más.
            const payload = {
                numero_cuenta: String(data.numero_cuenta).trim()
            };

            const response = await createCardRequest(payload);

            // El backend responde con { success: true, card: {...} }
            const newCard = response.data.card;

            set((state) => ({
                cards: [newCard, ...state.cards],
                loading: false
            }));

            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || "Error al emitir tarjeta";
            set({ loading: false, error: message });
            console.error("Error en createCard:", error.response?.data);
            throw error;
        }
    },

    deleteCard: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteCardRequest(id);
            set({ cards: get().cards.filter((c) => c.id !== id && c._id !== id), loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar tarjeta" });
            throw error;
        }
    },

    updateCard: async (id, estado) => {
        try {
            set({ loading: true });
            const response = await updateCardRequest(id, { estado });
            // Actualizamos la lista localmente
            const updatedCards = get().cards.map(c =>
                c.id === id ? { ...c, estado: response.data.card.estado } : c
            );
            set({ cards: updatedCards, loading: false });
        } catch (error) {
            set({ loading: false });
            throw error;
        }
    },
}));
