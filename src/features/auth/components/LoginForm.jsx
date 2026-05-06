import { useState, useEffect, useRef } from "react";
import { User, Lock, ArrowRight } from "lucide-react";
import imgUno from "../../../assets/img/carrusel_uno.png";
import imgDos from "../../../assets/img/carrusel_dos.png";
import imgTres from "../../../assets/img/carrusel_tres.png";

const carouselSlides = [
    { image: imgUno, title: "Explora sin límites", subtitle: "Tu aventura comienza aquí" },
    { image: imgDos, title: "Naturaleza viva", subtitle: "Conéctate con el mundo" },
    { image: imgTres, title: "Más allá del horizonte", subtitle: "Descubre lo extraordinario" },
];

export const LoginForm = ({ onForgot }) => {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(null);
    const [animating, setAnimating] = useState(false);
    const intervalRef = useRef(null);

    const goTo = (idx) => {
        if (animating || idx === current) return;
        setPrev(current);
        setAnimating(true);
        setCurrent(idx);
        setTimeout(() => { setPrev(null); setAnimating(false); }, 700);
    };

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrent((c) => {
                const next = (c + 1) % carouselSlides.length;
                setPrev(c);
                setAnimating(true);
                setTimeout(() => { setPrev(null); setAnimating(false); }, 700);
                return next;
            });
        }, 4000);
        return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <div className="fixed inset-0 flex overflow-hidden bg-[#060a10]">

            {/* ===== FORMULARIO ===== */}
            <div className="w-[45%] min-w-[340px] flex flex-col justify-center items-center px-10 py-12 relative z-10"
                style={{ background: "linear-gradient(160deg, #080d14 0%, #060a10 60%, #040810 100%)", borderRight: "1px solid rgba(16,185,129,0.07)" }}>

                {/* Glow de fondo */}
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)" }} />

                <div className="w-full max-w-[360px] relative">

                    {/* Encabezado */}
                    <div className="mb-10">
                        <div className="inline-flex items-center gap-2.5 rounded-xl px-3.5 py-2 mb-7"
                            style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
                            <div className="w-2 h-2 rounded-full bg-emerald-500" style={{ boxShadow: "0 0 8px #10b981" }} />
                            <span className="text-emerald-500 text-[10px] font-bold tracking-[0.15em] uppercase">Sistema</span>
                        </div>
                        <h1 className="text-slate-100 text-2xl font-bold tracking-tight mb-1.5">Bienvenido de vuelta</h1>
                        <p className="text-slate-500 text-[13.5px]">Ingresa tus credenciales para continuar</p>
                    </div>

                    {/* Usuario */}
                    <div className="mb-5">
                        <label className="block text-[10.5px] font-bold text-emerald-500 uppercase tracking-[0.15em] mb-2 ml-0.5">
                            Email o usuario
                        </label>
                        <div className="relative group">
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors">
                                <User className="w-[18px] h-[18px]" />
                            </div>
                            <input
                                type="text"
                                placeholder="correo@ejemplo.com o usuario"
                                className="w-full pl-11 pr-4 py-3.5 text-[13.5px] rounded-xl text-slate-200 placeholder:text-slate-700 outline-none transition-all duration-200"
                                style={{ background: "#070c14", border: "1px solid rgba(30,41,59,0.8)" }}
                                onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.35)")}
                                onBlur={(e) => (e.target.style.borderColor = "rgba(30,41,59,0.8)")}
                            />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div className="mb-3.5">
                        <label className="block text-[10.5px] font-bold text-emerald-500 uppercase tracking-[0.15em] mb-2 ml-0.5">
                            Contraseña
                        </label>
                        <div className="relative group">
                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors">
                                <Lock className="w-[18px] h-[18px]" />
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3.5 text-[13.5px] rounded-xl text-slate-200 placeholder:text-slate-700 outline-none transition-all duration-200"
                                style={{ background: "#070c14", border: "1px solid rgba(30,41,59,0.8)" }}
                                onFocus={(e) => (e.target.style.borderColor = "rgba(16,185,129,0.35)")}
                                onBlur={(e) => (e.target.style.borderColor = "rgba(30,41,59,0.8)")}
                            />
                        </div>
                    </div>

                    {/* ¿Olvidaste? */}
                    <div className="flex justify-end mb-7">
                        <button type="button" onClick={onForgot}
                            className="text-xs font-medium text-slate-500 hover:text-emerald-400 transition-colors">
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div>

                    {/* Submit */}
                    <button type="submit"
                        className="group w-full py-3.5 px-5 rounded-xl font-bold text-sm text-[#030712] flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
                        style={{ background: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)", boxShadow: "0 4px 24px rgba(16,185,129,0.2)" }}>
                        Iniciar sesión
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* ===== CARRUSEL ===== */}
            <div className="flex-1 relative overflow-hidden bg-[#030608]">

                {/* Slide anterior (salida) */}
                {prev !== null && (
                    <div key={`prev-${prev}`} style={{ position: 'absolute', inset: 0, zIndex: 1, animation: 'fadeOut 0.7s ease forwards' }}>
                        <img src={carouselSlides[prev].image} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,10,16,0.85) 0%, rgba(6,10,16,0.2) 50%, transparent 100%)" }} />
                    </div>
                )}

                {/* Slide actual (entrada) */}
                <div key={`curr-${current}`} style={{ position: 'absolute', inset: 0, zIndex: 2, animation: 'fadeIn 0.7s ease forwards' }}>
                    <img src={carouselSlides[current].image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(6,10,16,0.9) 0%, rgba(6,10,16,0.35) 50%, rgba(6,10,16,0.1) 100%)" }} />
                </div>

                {/* Texto del slide */}
                <div key={`text-${current}`} style={{ position: 'absolute', bottom: 56, left: 48, zIndex: 10, animation: 'slideUp 0.6s ease 0.2s both' }}>
                    <p className="text-emerald-400 text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
                        {carouselSlides[current].subtitle}
                    </p>
                    <h2 className="text-slate-50 text-3xl font-bold tracking-tight leading-tight max-w-[300px]">
                        {carouselSlides[current].title}
                    </h2>
                </div>

                {/* Indicadores verticales */}
                <div className="absolute bottom-14 right-10 z-10 flex flex-col gap-2 items-center">
                    {carouselSlides.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)}
                            className="rounded-full border-none cursor-pointer p-0 transition-all duration-300"
                            style={{
                                width: 3,
                                height: i === current ? 28 : 10,
                                background: i === current ? "#10b981" : "rgba(255,255,255,0.2)",
                                boxShadow: i === current ? "0 0 8px rgba(16,185,129,0.5)" : "none",
                            }} />
                    ))}
                </div>

                {/* Animaciones personalizadas en Tailwind */}
                <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
            </div>
        </div>
    );
};