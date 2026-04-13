export const ForgotPasswordForm = ({ onSwitch }) => {
    return (
        <form className="flex flex-col gap-5">

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Correo electrónico
                </label>

                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200"
                />
            </div>

            {/* Botón */}
            <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm"
            >
                Enviar correo
            </button>

            {/* Texto */}
            <p className="text-center text-sm text-slate-600">
                ¿Ya recordaste tu contraseña?
            </p>

            {/* Volver */}
            <div className="text-center">
                <button
                    type="button"
                    onClick={onSwitch}
                    className="text-blue-800 font-medium hover:underline text-sm"
                >
                    Iniciar sesión
                </button>
            </div>

        </form>
    );
};