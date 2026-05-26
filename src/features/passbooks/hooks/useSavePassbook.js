import { usePassbooksStore } from "../store/passbooksStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const useSavePassbook = () => {
    const createPassbook = usePassbooksStore((state) => state.createPassbook);
    const loading = usePassbooksStore((state) => state.loading);

    const savePassbook = async (data) => {
        try {
            // Enviamos numero_cuenta y tipo_libreta al store
            await createPassbook({
                numero_cuenta: String(data.numero_cuenta).trim(),
                tipo_libreta: data.tipo_libreta || "AHORRO",
            });
            showSuccess("Libreta creada y vinculada correctamente");
            return true;
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Error al procesar la libreta";
            showError(errorMsg);
            return false;
        }
    };

    return { savePassbook, loading };
};