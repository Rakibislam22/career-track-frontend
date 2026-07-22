import { KanbanSquare } from 'lucide-react';

const Navbar = () => {
    return (
        <div className="navbar sticky top-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-md px-6 lg:px-16">
            <div className="flex-1">
                <a href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
                    <KanbanSquare className="h-5 w-5 text-primary" />
                    CareerTrack <span className="text-primary">Lite</span>
                </a>
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-white/60 mr-6">
                <a href="#features" className="hover:text-white transition-colors">Features</a>
                <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
                <a href="#pipeline" className="hover:text-white transition-colors">Pipeline</a>
            </div>
            <div className="flex gap-2">
                <a href="/login" className="btn btn-ghost btn-sm text-white">Sign in</a>
                <a href="/register" className="btn btn-primary btn-sm">Get started</a>
            </div>
        </div>
    );
};

export default Navbar;