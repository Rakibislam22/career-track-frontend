import { Outlet, NavLink, useNavigate } from "react-router";
import {
    KanbanSquare,
    LayoutDashboard,
    ListChecks,
    PlusCircle,
} from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";

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
                <DashboardNavbar onLogout={handleLogout} user={user} />

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
                            <NavLink to="/dashboard/application/new" className={navLinkClass}>
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
