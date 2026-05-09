import { create } from "zustand";
import {
    getAllUsers as getAllUsersRequest,
    createUser as createUserRequest,
    updateUser as updateUserRequest,
    deleteUser as deleteUserRequest,
    updateUserRoleAdmin as updateUserRoleRequest,
} from "../../../shared/api";

export const useUsersStore = create((set, get) => ({
    users: [],
    loading: false,
    error: null,

    getUsers: async () => {
        try {
            set({ loading: true, error: null });
            const response = await getAllUsersRequest();
            const data = response.data?.users || response.data?.data || response.data || [];
            set({ users: Array.isArray(data) ? data : [], loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error al obtener usuarios", loading: false });
            throw error;
        }
    },

    createUser: async (formData) => {
        try {
            set({ loading: true, error: null });
            const response = await createUserRequest(formData);
            const newUser = response.data?.data || response.data?.user || response.data;
            set({ users: [newUser, ...get().users], loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al crear usuario" });
            throw error;
        }
    },

    updateUser: async (id, data) => {
        try {
            set({ loading: true, error: null });
            const response = await updateUserRequest(id, data);
            const updated = response.data?.data || response.data?.user || response.data;
            set({
                users: get().users.map((u) => (u.id === id || u._id === id ? updated : u)),
                loading: false,
            });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al actualizar usuario" });
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            set({ loading: true, error: null });
            await deleteUserRequest(id);
            set({ users: get().users.filter((u) => u.id !== id && u._id !== id), loading: false });
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al eliminar usuario" });
            throw error;
        }
    },

    updateUserRole: async (userId, roleName) => {
        try {
            set({ loading: true, error: null });
            await updateUserRoleRequest(userId, roleName);
            await get().getUsers();
        } catch (error) {
            set({ loading: false, error: error.response?.data?.message || "Error al actualizar rol" });
            throw error;
        }
    },
}));
