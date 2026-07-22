import { KanbanSquare, LogOut, Menu, User } from "lucide-react";
import { Link } from "react-router";

export default function DashboardNavbar() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    // Builds initials from the user's name for the avatar circle — e.g. "Rakib Hasan" -> "RH"
    const initials = user?.name
        ? user.name
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
        : "?";

    return (
        <nav className="navbar border-b border-white/10 bg-transparent backdrop-blur-md px-4 lg:px-8 sticky top-0 z-40">
            <div className="flex-1 flex items-center gap-3">
                <label
                    htmlFor="dashboard-drawer"
                    aria-label="open sidebar"
                    className="btn btn-square btn-ghost btn-sm text-white hover:bg-white/10 lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </label>
                <Link to="/" className="flex items-center gap-2 font-semibold text-white">
                    <KanbanSquare className="h-5 w-5 text-primary" />
                    CareerTrack <span className="text-primary">Lite</span>
                </Link>
            </div>

            <div className="flex items-center gap-3">
                {/* Avatar with click-to-open dropdown — daisyUI handles open/close/outside-click */}
                <div className="dropdown dropdown-end">
                    <button
                        tabIndex={0}
                        className="btn btn-ghost btn-circle hover:bg-white/10"
                    >
                        {/* flex + items-center + justify-center centers the initials — was missing before */}
                        <div className="bg-primary/20 text-primary border border-primary/30 rounded-full w-9 h-9 flex items-center justify-center">
                            <span className="text-xs font-semibold leading-none">{initials}</span>
                        </div>
                    </button>

                    <div
                        tabIndex={0}
                        className="dropdown-content menu mt-3 w-64 rounded-xl glass-solid bg-[#18201a] p-0 shadow-2xl overflow-hidden z-50"
                    >
                        {/* User info header */}
                        <div className="flex items-center gap-3 p-4 border-b border-white/10">
                            <div className="bg-primary/20 text-primary border border-primary/30 rounded-full w-10 h-10 flex items-center justify-center shrink-0">
                                {user?.name ? (
                                    <span className="text-sm font-semibold leading-none">{initials}</span>
                                ) : (
                                    <User className="h-4 w-4" />
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
                                <p className="text-xs text-white/50 truncate">{user?.email}</p>
                            </div>
                        </div>

                        {/* Logout */}
                        <ul className="p-2">
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-error hover:bg-error/10 transition-colors w-full"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
