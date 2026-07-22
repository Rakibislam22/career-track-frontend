import { Outlet, NavLink, useNavigate } from "react-router";
import {
    KanbanSquare,
    LayoutDashboard,
    ListChecks,
    PlusCircle,
    LogOut,
    Menu,
} from "lucide-react";

export default function DashboardLayout() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    // NavLink gives us isActive for free — highlights the current section
    const navLinkClass = ({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${isActive
            ? "bg-primary/15 text-primary font-medium"
            : "text-white/60 hover:bg-white/5 hover:text-white"
        }`;

    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col min-h-screen">
                {/* ================= NAVBAR ================= */}
                <nav className="navbar border-b border-white/10 bg-transparent backdrop-blur-md px-4 lg:px-8 sticky top-0 z-40">
                    <div className="flex-1 flex items-center gap-3">
                        <label
                            htmlFor="dashboard-drawer"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost btn-sm text-white hover:bg-white/10 lg:hidden"
                        >
                            <Menu className="h-5 w-5" />
                        </label>
                        <a href="/" className="flex items-center gap-2 font-semibold text-white">
                            <KanbanSquare className="h-5 w-5 text-primary" />
                            CareerTrack <span className="text-primary">Lite</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-white/60 hidden sm:block">{user?.name}</span>
                        <button
                            onClick={handleLogout}
                            className="btn btn-ghost btn-sm text-white hover:bg-white/10 gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </nav>

                {/* ================= NESTED ROUTE CONTENT ================= */}
                <main className="flex-1 px-6 lg:px-10 py-8">
                    <Outlet />
                </main>
            </div>

            {/* ================= SIDEBAR ================= */}
            <div className="drawer-side z-50">
                <label
                    htmlFor="dashboard-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="flex min-h-full w-64 flex-col gap-1 bg-[#0d131c] border-r border-white/10 p-4">
                    <div className="flex items-center gap-2 px-2 mb-6 lg:hidden">
                        <KanbanSquare className="h-5 w-5 text-primary" />
                        <span className="font-semibold text-white">CareerTrack Lite</span>
                    </div>

                    <ul className="menu w-full gap-1 p-0">
                        <li>
                            <NavLink to="/dashboard" end className={navLinkClass}>
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/applications" className={navLinkClass}>
                                <ListChecks className="h-4 w-4" />
                                All Applications
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/applications/new" className={navLinkClass}>
                                <PlusCircle className="h-4 w-4" />
                                Add Application
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
