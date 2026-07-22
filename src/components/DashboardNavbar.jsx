import { KanbanSquare, LogOut } from "lucide-react";

export default function DashboardNavbar() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <div className="navbar sticky top-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-md px-6 lg:px-16">
            <div className="flex-1">
                <a href="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-white">
                    <KanbanSquare className="h-5 w-5 text-primary" />
                    CareerTrack <span className="text-primary">Lite</span>
                </a>
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-white/60 mr-6">
                <a href="/dashboard" className="text-white">Dashboard</a>
                <a href="/applications" className="hover:text-white transition-colors">Applications</a>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm text-white/60 hidden sm:block">{user?.name}</span>
                <button
                    onClick={handleLogout}
                    className="btn btn-ghost btn-sm text-white hover:bg-white/10 gap-2"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </div>
    );
}
