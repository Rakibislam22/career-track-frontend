import { KanbanSquare } from "lucide-react";
import { Link } from "react-router";

// Shared shell for auth pages — keeps the glass card + logo consistent
export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        
        <Link to="/"
          className="flex items-center justify-center gap-2 text-lg font-semibold text-white mb-8"
        >
          <KanbanSquare className="h-5 w-5 text-primary" />
          CareerTrack <span className="text-primary">Lite</span>
        </Link>

        <div className="glass-surface rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
          <p className="text-sm text-white/60 mb-6">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}