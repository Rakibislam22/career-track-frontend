import { KanbanSquare, Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const closeDrawer = () => setDrawerOpen(false);

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d131c]/10 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 lg:px-2 flex items-center justify-between h-16">
                {/* Mobile Hamburger Drawer */}
                <div className="flex items-center md:hidden mr-2">
                    <div className="drawer drawer-start z-50">
                        <input
                            id="mobile-menu"
                            type="checkbox"
                            className="drawer-toggle"
                            checked={drawerOpen}
                            onChange={(e) => setDrawerOpen(e.target.checked)}
                            aria-label="Toggle navigation drawer"
                        />

                        <div className="drawer-content">
                            <label
                                htmlFor="mobile-menu"
                                className="btn btn-ghost btn-square text-white min-h-[44px] min-w-[44px] focus-visible:ring-2 focus-visible:ring-primary"
                                aria-label="Open navigation menu"
                            >
                                <Menu className="w-6 h-6" aria-hidden="true" />
                            </label>
                        </div>

                        <div className="drawer-side">
                            <label
                                htmlFor="mobile-menu"
                                className="drawer-overlay"
                                aria-label="Close navigation menu"
                            ></label>

                            <div className="menu min-h-full w-72 p-6 bg-[#0e1622] border-r border-white/10 text-white flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                                        <Link
                                            to="/"
                                            onClick={closeDrawer}
                                            className="flex items-center gap-2 text-lg font-bold text-white focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-1 py-0.5"
                                        >
                                            <KanbanSquare className="h-5 w-5 text-primary" aria-hidden="true" />
                                            CareerTrack <span className="text-primary">Lite</span>
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={closeDrawer}
                                            className="btn btn-ghost btn-square btn-sm text-white/70 hover:text-white"
                                            aria-label="Close menu"
                                        >
                                            <X className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <ul className="flex flex-col gap-1 text-base font-medium">
                                        <li>
                                            <a
                                                href="#features"
                                                onClick={closeDrawer}
                                                className="py-3 px-4 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                                            >
                                                Features
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#how-it-works"
                                                onClick={closeDrawer}
                                                className="py-3 px-4 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                                            >
                                                How it works
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#pipeline"
                                                onClick={closeDrawer}
                                                className="py-3 px-4 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
                                            >
                                                Pipeline
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                                    {token ? (
                                        <Link
                                            to="/dashboard"
                                            onClick={closeDrawer}
                                            className="btn btn-primary w-full shadow-lg shadow-primary/20"
                                        >
                                            Go to Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                onClick={closeDrawer}
                                                className="btn btn-ghost border border-white/10 text-white w-full hover:bg-white/10"
                                            >
                                                Sign in
                                            </Link>
                                            <Link
                                                to="/register"
                                                onClick={closeDrawer}
                                                className="btn btn-primary w-full shadow-lg shadow-primary/20"
                                            >
                                                Get started free
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logo */}
                <div className="flex-1 md:flex-initial">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-lg font-bold text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-1 py-0.5"
                        aria-label="CareerTrack Lite Home"
                    >
                        <KanbanSquare className="h-6 w-6 text-primary" aria-hidden="true" />
                        <span>CareerTrack <span className="text-primary">Lite</span></span>
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <nav
                    className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70"
                    aria-label="Primary navigation"
                >
                    <a
                        href="#features"
                        className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
                    >
                        Features
                    </a>
                    <a
                        href="#how-it-works"
                        className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
                    >
                        How it works
                    </a>
                    <a
                        href="#pipeline"
                        className="hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
                    >
                        Pipeline
                    </a>
                </nav>

                {/* Desktop Auth Actions */}
                <div className="flex items-center gap-3">
                    {token ? (
                        <Link
                            to="/dashboard"
                            className="btn btn-primary btn-sm px-4 shadow-sm shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="btn btn-ghost btn-sm text-white/80 hover:text-white hover:bg-white/10 active:scale-[0.98] transition-all"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/register"
                                className="btn btn-primary btn-sm px-4 shadow-sm shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all"
                            >
                                Get started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
