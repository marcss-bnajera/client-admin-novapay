import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import defaultAvatarImg from "../../assets/img/avatar_novapay.png";

export const AvatarUser = () => {
    const { user, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    const avatarSrc = user?.profilePicture && user.profilePicture.trim() !== ""
        ? user.profilePicture
        : defaultAvatarImg;

    return (
        <div className="relative" ref={dropdownRef}>

            {/* Foto de perfil */}
            <img
                onClick={() => setOpen(!open)}
                src={avatarSrc}
                alt={user?.username}
                className="w-10 h-10 rounded-xl object-cover cursor-pointer ring-2 ring-emerald-500/40 hover:ring-emerald-400/70 transition-all"
                onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatarImg; }}
            />

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl z-50 overflow-hidden"
                    style={{ background: "#080d14", border: "1px solid rgba(16,185,129,0.15)", boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.05)" }}>

                    {/* Header usuario */}
                    <div className="px-4 py-3.5 flex items-center gap-3"
                        style={{ borderBottom: "1px solid rgba(30,41,59,0.8)" }}>
                        <img
                            src={avatarSrc}
                            alt={user?.username}
                            className="w-9 h-9 rounded-lg object-cover ring-1 ring-emerald-500/30"
                            onError={(e) => { e.target.onerror = null; e.target.src = defaultAvatarImg; }}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-100 truncate">{user?.username}</p>
                            <p className="text-[11px] text-emerald-500/80 truncate">{user?.email}</p>
                        </div>
                    </div>

                    {/* Links */}
                    <ul className="p-2">
                        <li>
                            <Link to="/dashboard/home"
                                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all">
                                <LayoutDashboard className="w-4 h-4 text-emerald-500" />
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard/users"
                                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all">
                                <Users className="w-4 h-4 text-emerald-500" />
                                Usuarios
                            </Link>
                        </li>
                    </ul>

                    {/* Logout */}
                    <div className="p-2" style={{ borderTop: "1px solid rgba(30,41,59,0.8)" }}>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                            <LogOut className="w-4 h-4" />
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};