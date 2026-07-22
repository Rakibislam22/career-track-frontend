// Single reusable stat tile — used for all 7 dashboard counters
export default function StatCard({ label, value, icon: Icon, accentClass }) {
    return (
        <div className="glass-surface rounded-xl p-5 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-white/50 uppercase tracking-wide">
                    {label}
                </span>
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${accentClass}`}>
                    <Icon className="h-4 w-4" />
                </div>
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
        </div>
    );
}
