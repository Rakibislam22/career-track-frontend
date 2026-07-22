import { Link } from "react-router";
import { KanbanSquare, ArrowLeft, SearchX } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 text-center">
            <div className="max-w-md">
                <Link
                    to="/"
                    className="flex items-center justify-center gap-2 text-lg font-semibold text-white mb-10"
                >
                    <KanbanSquare className="h-5 w-5 text-primary" />
                    CareerTrack <span className="text-primary">Lite</span>
                </Link>

                <div className="glass-surface rounded-2xl p-10">
                    <div className="h-14 w-14 rounded-full bg-error/15 flex items-center justify-center mx-auto mb-6">
                        <SearchX className="h-6 w-6 text-error" />
                    </div>

                    <p className="text-6xl font-bold text-white/10 mb-2">404</p>
                    <h1 className="text-xl font-bold text-white mb-2">Page not found</h1>
                    <p className="text-sm text-white/50 mb-8">
                        The page you're looking for doesn't exist, or may have been moved.
                    </p>

                    <Link
                        to="/"
                        className="btn btn-primary btn-sm gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}
