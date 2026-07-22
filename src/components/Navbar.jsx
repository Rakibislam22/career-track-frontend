import { KanbanSquare } from 'lucide-react';
import { Link } from 'react-router';

const Navbar = () => {
    return (
        <div className="navbar sticky top-0 z-50 border-b border-white/10 bg-transparent backdrop-blur-md px-6 lg:px-16">
            <div className="flex-1">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
                    <KanbanSquare className="h-5 w-5 text-primary" />
                    CareerTrack <span className="text-primary">Lite</span>
                </Link>
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-white/60 mr-6">
                <a href="#features" className="hover:text-white transition-colors">Features</a>
                <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
                <a href="#pipeline" className="hover:text-white transition-colors">Pipeline</a>
            </div>
            <div className="flex gap-2">
                <Link to="/login" className="btn btn-ghost btn-sm text-white">Sign in</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Get started</Link>
            </div>
        </div>
    );
};

export default Navbar;