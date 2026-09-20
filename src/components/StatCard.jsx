import { Link } from "react-router";

// Single reusable stat tile — used for dashboard counters with optional filtering link
export default function StatCard({ label, value, icon: Icon, accentClass, to }) {
    const cardContent = (
        <>
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white/75 uppercase tracking-wider">
                    {label}
                </span>
                <div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${accentClass}`}
                    aria-hidden="true"
                >
                    <Icon className="h-4 w-4" />
                </div>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{value}</p>
        </>
    );

    const baseClasses =
        "glass-surface rounded-xl p-4 sm:p-5 border border-white/10 transition-all duration-200 block";

    if (to) {
        return (
            <Link
                to={to}
                className={`${baseClasses} hover:border-primary/50 hover:bg-white/10 hover:-translate-y-0.5 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-primary`}
                aria-label={`${label} applications: ${value}. Click to view filtered list.`}
            >
                {cardContent}
            </Link>
        );
    }

    return (
        <div
            className={baseClasses}
            aria-label={`${label} applications: ${value}`}
        >
            {cardContent}
        </div>
    );
}
