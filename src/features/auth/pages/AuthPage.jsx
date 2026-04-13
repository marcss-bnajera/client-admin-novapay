import { useState } from "react";
import { LoginForm } from "../components/LoginForm"
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

export const AuthPage = () => {
    const [isForgot, setIsForgot] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-200 p-8 md:p-10">

                <div className="text-center mb-8">

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img
                            src="/src/assets/img/logo_novapay.png"
                            alt="NovaPay"
                            className="h-16 w-auto object-contain"
                        />
                    </div>

                    {/* Título */}
                    <h1 className="text-2xl lg:text-3xl font-semibold text-slate-900 mb-2">
                        {isForgot
                            ? "Recuperar contraseña"
                            : "Bienvenido de nuevo"}
                    </h1>

                    {/* Descripción */}
                    <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
                        {isForgot
                            ? "Ingresa tu correo electrónico para recibir instrucciones de recuperación"
                            : "Accede con tu cuenta para continuar"}
                    </p>
                </div>

                {/* Formularios */}
                {isForgot ? (
                    <ForgotPasswordForm onSwitch={() => setIsForgot(false)} />
                ) : (
                    <LoginForm onForgot={() => setIsForgot(true)} />
                )}

            </div>
        </div>
    );
};