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
    Loader2,
    Inbox,
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
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">Dashboard</h1>
                <p className="text-white/50 text-sm">An overview of your job search pipeline.</p>
            </div>

            {showColdStart && <ColdStartNotice />}

            {error && (
                <div className="alert alert-error alert-soft mb-6 text-sm">
                    <span>{error}</span>
                </div>
            )}

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 text-white/50">
                    <Loader2 className="h-6 w-6 animate-spin mb-3" />
                    <p className="text-sm">Loading your dashboard...</p>
                </div>
            ) : stats ? (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                        <StatCard label="Total" value={stats.total} icon={Briefcase} accentClass="bg-white/10 text-white" />
                        <StatCard label="Saved" value={stats.saved} icon={Bookmark} accentClass="bg-gray-400/15 text-gray-300" />
                        <StatCard label="Applied" value={stats.applied} icon={Send} accentClass="bg-blue-500/15 text-blue-400" />
                        <StatCard label="Assessment" value={stats.assessment} icon={ClipboardList} accentClass="bg-amber-500/15 text-amber-400" />
                        <StatCard label="Interview" value={stats.interview} icon={Users} accentClass="bg-amber-500/15 text-amber-400" />
                        <StatCard label="Rejected" value={stats.rejected} icon={XCircle} accentClass="bg-red-500/15 text-red-400" />
                        <StatCard label="Offer" value={stats.offer} icon={Trophy} accentClass="bg-green-500/15 text-green-400" />
                    </div>

                    <div className="grid lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-2 glass-surface rounded-xl p-6">
                            <h2 className="text-white font-semibold mb-4">Pipeline breakdown</h2>
                            {stats.total === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-white/40 text-sm">
                                    <Inbox className="h-8 w-8 mb-2" />
                                    No applications yet
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height={260}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                                        <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                                        <YAxis allowDecimals={false} tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} axisLine={{ stroke: "rgba(255,255,255,0.1)" }} />
                                        <Tooltip contentStyle={{ background: "#171e29", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem", color: "#fff" }} />
                                        <Bar dataKey="count" fill="#238636" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>

                        <div className="lg:col-span-3 glass-surface rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-white font-semibold">Recently added</h2>
                                <Link to="/dashboard/applications" className="text-sm text-primary hover:underline">
                                    View all
                                </Link>
                            </div>

                            {stats.recentApplications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-white/40 text-sm text-center">
                                    <Inbox className="h-8 w-8 mb-2" />
                                    No applications yet — add your first one to see it here.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {stats.recentApplications.map((app) => (
                                        <Link
                                            key={app.id}
                                            to={`/dashboard/application/${app.id}`}
                                            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 hover:border-white/20 transition-colors"
                                        >
                                            <div>
                                                <p className="font-medium text-sm text-white">{app.companyName}</p>
                                                <p className="text-xs text-white/50">{app.jobTitle}</p>
                                            </div>
                                            <span className={`badge ${statusBadgeClass[app.status]} badge-sm`}>
                                                {statusLabel[app.status]}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}
