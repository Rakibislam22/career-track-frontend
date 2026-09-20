import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
    Briefcase,
    Bookmark,
    Send,
    ClipboardList,
    Users,
    XCircle,
    Trophy,
    PlusCircle,
    Inbox,
    ArrowRight,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import ColdStartNotice from "../components/ColdStartNotice";
import StatCard from "../components/StatCard";
import DashboardSkeleton from "../components/DashboardSkeleton";
import { apiRequest } from "../lib/apiClient";
import { statusBadgeClass, statusLabel } from "../lib/constants";

export default function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showColdStart, setShowColdStart] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const coldStartTimer = setTimeout(() => setShowColdStart(true), 3000);

        apiRequest("/dashboard/stats")
            .then((data) => setStats(data))
            .catch((err) => setError(err.message))
            .finally(() => {
                clearTimeout(coldStartTimer);
                setIsLoading(false);
                setShowColdStart(false);
            });

        return () => clearTimeout(coldStartTimer);
    }, []);

    const chartData = stats
        ? [
            { name: "Saved", count: stats.saved },
            { name: "Applied", count: stats.applied },
            { name: "Assessment", count: stats.assessment },
            { name: "Interview", count: stats.interview },
            { name: "Rejected", count: stats.rejected },
            { name: "Offer", count: stats.offer },
        ]
        : [];

    return (
        <div>
            {/* Header with Title and Primary Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                        Dashboard
                    </h1>
                    <p className="text-white/70 text-sm">
                        An overview of your job search pipeline and recent activity.
                    </p>
                </div>
                <Link
                    to="/dashboard/application/new"
                    className="btn btn-primary btn-sm sm:btn-md gap-2 shadow-md shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all self-start sm:self-auto"
                >
                    <PlusCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Add Application</span>
                </Link>
            </div>

            {showColdStart && <ColdStartNotice />}

            {error && (
                <div
                    className="alert alert-error alert-soft mb-6 text-sm border border-error/30"
                    role="alert"
                >
                    <span>{error}</span>
                </div>
            )}

            {isLoading ? (
                <DashboardSkeleton />
            ) : stats ? (
                <>
                    {/* Stat Cards Grid with direct navigation */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard
                            label="Total"
                            value={stats.total}
                            icon={Briefcase}
                            accentClass="bg-white/10 text-white"
                            to="/dashboard/applications"
                        />
                        <StatCard
                            label="Saved"
                            value={stats.saved}
                            icon={Bookmark}
                            accentClass="bg-white/10 text-white/80"
                            to="/dashboard/applications?status=SAVED"
                        />
                        <StatCard
                            label="Applied"
                            value={stats.applied}
                            icon={Send}
                            accentClass="bg-info/20 text-info"
                            to="/dashboard/applications?status=APPLIED"
                        />
                        <StatCard
                            label="Assessment"
                            value={stats.assessment}
                            icon={ClipboardList}
                            accentClass="bg-warning/20 text-warning"
                            to="/dashboard/applications?status=ASSESSMENT"
                        />
                        <StatCard
                            label="Interview"
                            value={stats.interview}
                            icon={Users}
                            accentClass="bg-warning/20 text-warning"
                            to="/dashboard/applications?status=INTERVIEW"
                        />
                        <StatCard
                            label="Rejected"
                            value={stats.rejected}
                            icon={XCircle}
                            accentClass="bg-error/20 text-error"
                            to="/dashboard/applications?status=REJECTED"
                        />
                        <StatCard
                            label="Offer"
                            value={stats.offer}
                            icon={Trophy}
                            accentClass="bg-success/20 text-success"
                            to="/dashboard/applications?status=OFFER"
                        />
                    </div>

                    {/* Breakdown & Recent Activity */}
                    <div className="grid lg:grid-cols-5 gap-6">
                        {/* Pipeline Chart */}
                        <div
                            className="lg:col-span-2 glass-surface rounded-xl p-6 border border-white/10 flex flex-col justify-between"
                            role="region"
                            aria-label="Application pipeline breakdown chart"
                        >
                            <h2 className="text-white font-bold text-base mb-4">
                                Pipeline Breakdown
                            </h2>
                            {stats.total === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-white/50 text-sm text-center">
                                    <Inbox className="h-8 w-8 mb-2 opacity-50" aria-hidden="true" />
                                    <p className="font-medium mb-1">No data in pipeline yet</p>
                                    <p className="text-xs text-white/40 mb-4">
                                        Log an application to visualize your pipeline.
                                    </p>
                                    <Link
                                        to="/dashboard/application/new"
                                        className="btn btn-outline btn-xs border-white/20 text-white hover:bg-white/10"
                                    >
                                        Log application
                                    </Link>
                                </div>
                            ) : (
                                <div className="h-[260px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
                                            <XAxis
                                                dataKey="name"
                                                tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
                                                axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                                                tickLine={false}
                                            />
                                            <YAxis
                                                allowDecimals={false}
                                                tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
                                                axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                                                tickLine={false}
                                            />
                                            <Tooltip
                                                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                                contentStyle={{
                                                    backgroundColor: "#111827",
                                                    borderColor: "rgba(255,255,255,0.15)",
                                                    borderRadius: "0.5rem",
                                                    color: "#ffffff",
                                                    fontSize: "12px",
                                                }}
                                            />
                                            <Bar dataKey="count" fill="#238636" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>

                        {/* Recently Added Applications */}
                        <div className="lg:col-span-3 glass-surface rounded-xl p-6 border border-white/10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-white font-bold text-base">Recently Added</h2>
                                    <Link
                                        to="/dashboard/applications"
                                        className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
                                    >
                                        <span>View all</span>
                                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                                    </Link>
                                </div>

                                {stats.recentApplications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-white/50 text-sm text-center">
                                        <Inbox className="h-8 w-8 mb-2 opacity-50" aria-hidden="true" />
                                        <p className="font-medium mb-1">No applications logged yet</p>
                                        <p className="text-xs text-white/40 mb-4">
                                            Start by tracking your first job application.
                                        </p>
                                        <Link
                                            to="/dashboard/application/new"
                                            className="btn btn-primary btn-sm gap-1.5 shadow-sm"
                                        >
                                            <PlusCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                            Add your first application
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-2.5" role="list">
                                        {stats.recentApplications.map((app) => (
                                            <Link
                                                key={app.id}
                                                to={`/dashboard/application/${app.id}`}
                                                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 hover:border-white/20 transition-all focus-visible:ring-2 focus-visible:ring-primary group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-lg bg-primary/20 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                                                        {app.companyName ? app.companyName[0].toUpperCase() : "?"}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-sm text-white group-hover:text-primary transition-colors">
                                                            {app.companyName}
                                                        </p>
                                                        <p className="text-xs text-white/70">{app.jobTitle}</p>
                                                    </div>
                                                </div>
                                                <span className={`badge ${statusBadgeClass[app.status]} badge-sm font-medium`}>
                                                    {statusLabel[app.status]}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}
