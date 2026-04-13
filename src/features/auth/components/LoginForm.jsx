export const LoginForm = ({ onForgot }) => {
    return (
        <form className="flex flex-col gap-5">

            {/* Usuario */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email o usuario
                </label>

                <input
                    type="text"
                    placeholder="correo@ejemplo.com o usuario"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200"
                />
            </div>

            {/* Contraseña */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Contraseña
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-800 focus:border-blue-800 outline-none transition-all duration-200"
                />
            </div>

            {/* Botón */}
            <button
                type="submit"
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm"
            >
                Iniciar sesión
            </button>

            {/* Link */}
            <div className="text-center">
                <button
                    type="button"
                    onClick={onForgot}
                    className="text-blue-800 hover:underline text-sm font-medium"
                >
                    ¿Olvidaste tu contraseña?
                </button>
            </div>

        </form>
    );
};