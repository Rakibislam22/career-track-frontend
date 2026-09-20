export default function DashboardSkeleton() {
    return (
        <div className="animate-pulse flex flex-col gap-8" aria-busy="true" aria-label="Loading dashboard data">
            {/* Stat Cards Skeleton */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(7)].map((_, i) => (
                    <div
                        key={i}
                        className="glass-surface rounded-xl p-5 border border-white/5 flex flex-col justify-between h-28"
                    >
                        <div className="flex items-center justify-between">
                            <div className="h-3.5 w-16 bg-white/10 rounded"></div>
                            <div className="h-8 w-8 rounded-lg bg-white/10"></div>
                        </div>
                        <div className="h-7 w-12 bg-white/15 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Breakdown & Recent Skeleton */}
            <div className="grid lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2 glass-surface rounded-xl p-6 border border-white/5">
                    <div className="h-5 w-40 bg-white/15 rounded mb-6"></div>
                    <div className="h-60 w-full bg-white/5 rounded-lg flex items-end justify-between p-4 gap-2">
                        <div className="h-16 w-8 bg-white/10 rounded-t"></div>
                        <div className="h-28 w-8 bg-white/10 rounded-t"></div>
                        <div className="h-10 w-8 bg-white/10 rounded-t"></div>
                        <div className="h-20 w-8 bg-white/10 rounded-t"></div>
                        <div className="h-14 w-8 bg-white/10 rounded-t"></div>
                        <div className="h-24 w-8 bg-white/10 rounded-t"></div>
                    </div>
                </div>

                <div className="lg:col-span-3 glass-surface rounded-xl p-6 border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-5 w-36 bg-white/15 rounded"></div>
                        <div className="h-4 w-16 bg-white/10 rounded"></div>
                    </div>
                    <div className="flex flex-col gap-3">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="h-14 w-full bg-white/5 border border-white/5 rounded-xl flex items-center justify-between px-4"
                            >
                                <div className="flex flex-col gap-1.5">
                                    <div className="h-4 w-28 bg-white/15 rounded"></div>
                                    <div className="h-3 w-40 bg-white/10 rounded"></div>
                                </div>
                                <div className="h-6 w-16 bg-white/10 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

