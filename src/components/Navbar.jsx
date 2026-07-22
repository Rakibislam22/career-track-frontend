import { KanbanSquare, Menu } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
    return (
        <div className="navbar sticky top-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-md px-4 lg:px-16">

            {/* Mobile Hamburger */}
            <div className="drawer md:hidden w-auto mr-2">
                <input id="mobile-menu" type="checkbox" className="drawer-toggle" />

                <div className="drawer-content">
                    <label
                        htmlFor="mobile-menu"
                        className="btn btn-ghost btn-square drawer-button text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </label>
                </div>

                <div className="drawer-side z-50 ">
                    <label htmlFor="mobile-menu" className="drawer-overlay"></label>

                    <ul className="menu min-h-full w-64 p-6 bg-[#0d131c]">
                        <li>
                            <a href="#features">Features</a>
                        </li>
                        <li>
                            <a href="#how-it-works">How it works</a>
                        </li>
                        <li>
                            <a href="#pipeline">Pipeline</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Logo */}
            <div className="flex-1">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-lg font-semibold text-white"
                >
                    <KanbanSquare className="h-5 w-5 text-primary" />
                    CareerTrack <span className="text-primary">Lite</span>
                </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-6 text-sm font-medium text-white/60 mr-6">
                <a href="#features" className="hover:text-white transition-colors">
                    Features
                </a>
                <a
                    href="#how-it-works"
                    className="hover:text-white transition-colors"
                >
                    How it works
                </a>
                <a href="#pipeline" className="hover:text-white transition-colors">
                    Pipeline
                </a>
            </div>

            {/* Auth Buttons (Desktop + Mobile same position) */}
            {localStorage.getItem("token") ? (
                <Link to="/dashboard" className="btn btn-primary btn-sm ml-4">
                    Go to Dashboard
                </Link>
            ) : (
                <div className="flex gap-2">
                    <Link to="/login" className="btn btn-ghost btn-sm text-white">
                        Sign in
                    </Link>
                    <Link to="/register" className="btn btn-primary btn-sm">
                        Get started
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Navbar;
