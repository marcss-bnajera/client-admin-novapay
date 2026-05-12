import { usePassbooksStore } from "../store/passbooksStore";
import { showSuccess, showError } from "../../../shared/utils/toast";

export const useSavePassbook = () => {
    // Extraemos la función del store
    const createPassbook = usePassbooksStore((state) => state.createPassbook);
    const loading = usePassbooksStore((state) => state.loading);

    const savePassbook = async (data) => {
        try {
            // Aquí podrías transformar los datos si fuera necesario
            // (En este caso, solo enviamos el numero_cuenta que viene del form)
            await createPassbook(data);

            showSuccess("Libreta creada y vinculada correctamente");
            return true; // Retornamos true si todo salió bien
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Error al procesar la libreta";
            showError(errorMsg);
            return false; // Retornamos false si hubo error
        }
    };

    return { savePassbook, loading };
};