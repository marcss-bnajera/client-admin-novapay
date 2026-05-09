import { axiosAdmin, axiosAuth } from "./api";

// ==================== ROLES ====================
export const getRoles = async () => {
    return await axiosAdmin.get("/roles");
};

// ==================== USERS ====================
export const getAllUsers = async () => {
    return await axiosAdmin.get("/users");
};

export const createUser = async (data) => {
    return await axiosAdmin.post("/users/save", data);
};

export const updateUser = async (id, data) => {
    return await axiosAdmin.put(`/users/update/${id}`, data);
};

export const updateUserRoleAdmin = async (id, data) => {
    return await axiosAdmin.put(`/users/update/${id}`, data);
};

export const deleteUser = async (id) => {
    return await axiosAdmin.delete(`/users/delete/${id}`);
};

export const addExtraAccount = async (data) => {
    return await axiosAdmin.post("/users/addaccount", data);
};

// ==================== ACCOUNTS ====================
export const getAccounts = async () => {
    return await axiosAdmin.get("/accounts");
};

export const updateAccount = async (numeroCuenta, data) => {
    return await axiosAdmin.put(`/accounts/${numeroCuenta}`, data);
};

export const deleteAccount = async (numeroCuenta) => {
    return await axiosAdmin.delete(`/accounts/${numeroCuenta}`);
};

// ==================== DEPOSITS ====================
export const getDeposits = async () => {
    return await axiosAdmin.get("/deposits");
};

export const createDeposit = async (data) => {
    return await axiosAdmin.post("/deposits/deposit", data);
};

// ==================== CARDS ====================
export const getCards = async () => {
    return await axiosAdmin.get("/cards");
};

export const createCard = async (data) => {
    return await axiosAdmin.post("/cards/create", data);
};

export const deleteCard = async (id) => {
    return await axiosAdmin.delete(`/cards/${id}`);
};

// ==================== PASSBOOKS ====================
export const getPassbooks = async () => {
    return await axiosAdmin.get("/passbooks");
};

export const createPassbook = async (data) => {
    return await axiosAdmin.post("/passbooks/create", data);
};

export const deletePassbook = async (id) => {
    return await axiosAdmin.delete(`/passbooks/${id}`);
};

// ==================== PRODUCTS ====================
export const getProducts = async () => {
    return await axiosAdmin.get("/products");
};

export const createProduct = async (data) => {
    return await axiosAdmin.post("/products", data);
};

export const updateProduct = async (id, data) => {
    return await axiosAdmin.put(`/products/${id}`, data);
};

export const deleteProduct = async (id) => {
    return await axiosAdmin.delete(`/products/${id}`);
};

// ==================== TRANSFERS ====================
export const getTransfers = async () => {
    return await axiosAdmin.get("/transfers/all");
};

// ==================== TRANSACTIONS ====================
export const getTransactions = async () => {
    return await axiosAdmin.get("/transactions");
};

// ==================== SHOPPINGS ====================
export const getShoppings = async () => {
    return await axiosAdmin.get("/shoppings");
};

export const createShopping = async (data) => {
    return await axiosAdmin.post("/shoppings", data);
};

export const deleteShopping = async (id) => {
    return await axiosAdmin.delete(`/shoppings/${id}`);
};

// ==================== CURRENCIES ====================
export const getCurrencies = async () => {
    return await axiosAdmin.get("/currencies");
};

export const createCurrency = async (data) => {
    return await axiosAdmin.post("/currencies", data);
};

export const updateCurrency = async (id, data) => {
    return await axiosAdmin.put(`/currencies/${id}`, data);
};

export const deleteCurrency = async (id) => {
    return await axiosAdmin.delete(`/currencies/${id}`);
};
