import { KanbanSquare, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";

// Shared shell for auth pages — keeps the glass card + logo consistent
export default function AuthLayout({ title, subtitle, children }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard", { replace: true });
        }
    }, [location, navigate]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
                        aria-label="Back to home page"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Back to home</span>
                    </Link>

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-base font-bold text-white focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
                        aria-label="CareerTrack Lite Home"
                    >
                        <KanbanSquare className="h-5 w-5 text-primary" aria-hidden="true" />
                        <span>CareerTrack <span className="text-primary">Lite</span></span>
                    </Link>
                </div>

                <div className="glass-surface rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10">
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                            {title}
                        </h1>
                        <p className="text-sm text-white/75 leading-relaxed">
                            {subtitle}
                        </p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}