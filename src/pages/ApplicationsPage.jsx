import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router";
import { Search, PlusCircle, Loader2, Inbox, Trash2, Eye } from "lucide-react";
import Swal from "sweetalert2";
import { apiRequest } from "../lib/apiClient";
import { STATUS_OPTIONS, SOURCE_OPTIONS, statusBadgeClass, statusLabel, sourceLabel, swalDarkTheme } from "../lib/constants";

export default function ApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [source, setSource] = useState("");
    const [sort, setSort] = useState("newest");

    const fetchApplications = useCallback(async () => {
        setIsLoading(true);
        setError("");
        try {
            const params = new URLSearchParams();
            if (search) params.set("search", search);
            if (status) params.set("status", status);
            if (source) params.set("source", source);
            if (sort) params.set("sort", sort);

            const data = await apiRequest(`/applications?${params.toString()}`);
            setApplications(data.applications);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [search, status, source, sort]);

    useEffect(() => {
        // Small debounce so typing in search doesn't fire a request per keystroke
        const timer = setTimeout(fetchApplications, 300);
        return () => clearTimeout(timer);
    }, [fetchApplications]);

    const handleDelete = async (id, companyName) => {
        const result = await Swal.fire({
            title: "Delete this application?",
            text: `Your application to ${companyName} will be permanently removed.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#cf222e",
            cancelButtonColor: "#30363d",
            ...swalDarkTheme,
        });

        if (!result.isConfirmed) return;

        try {
            await apiRequest(`/applications/${id}`, { method: "DELETE" });
            setApplications((prev) => prev.filter((app) => app.id !== id));
            Swal.fire({ title: "Deleted", text: "The application has been removed.", icon: "success", ...swalDarkTheme });
        } catch (err) {
            Swal.fire({ title: "Error", text: err.message, icon: "error", ...swalDarkTheme });
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">All Applications</h1>
                    <p className="text-white/50 text-sm">{applications.length} application(s)</p>
                </div>
                <Link to="/dashboard/application/new" className="btn btn-primary btn-sm gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Application
                </Link>
            </div>

            <div className="glass-surface rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="h-4 w-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search by company or job title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary pl-9"
                    />
                </div>

                <select value={status} onChange={(e) => setStatus(e.target.value)} className="select bg-white/5 border-white/10 text-white focus:border-primary">
                    <option value="" className="bg-[#171e29]">All statuses</option>
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-[#171e29]">{statusLabel[s]}</option>
                    ))}
                </select>

                <select value={source} onChange={(e) => setSource(e.target.value)} className="select bg-white/5 border-white/10 text-white focus:border-primary">
                    <option value="" className="bg-[#171e29]">All sources</option>
                    {SOURCE_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-[#171e29]">{sourceLabel[s]}</option>
                    ))}
                </select>

                <select value={sort} onChange={(e) => setSort(e.target.value)} className="select bg-white/5 border-white/10 text-white focus:border-primary">
                    <option value="newest" className="bg-[#171e29]">Newest first</option>
                    <option value="oldest" className="bg-[#171e29]">Oldest first</option>
                </select>
            </div>

            {error && (
                <div className="alert alert-error alert-soft mb-6 text-sm">
                    <span>{error}</span>
                </div>
            )}

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-24 text-white/50">
                    <Loader2 className="h-6 w-6 animate-spin mb-3" />
                    <p className="text-sm">Loading applications...</p>
                </div>
            ) : applications.length === 0 ? (
                <div className="glass-surface rounded-xl flex flex-col items-center justify-center py-24 text-white/40 text-sm">
                    <Inbox className="h-8 w-8 mb-3" />
                    <p className="mb-1">No applications found</p>
                    <p className="text-xs text-white/30">Try adjusting your filters, or add a new application.</p>
                </div>
            ) : (
                <div className="glass-surface rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="border-white/10 text-white/50 text-xs uppercase">
                                    <th>Company</th>
                                    <th>Job Title</th>
                                    <th>Source</th>
                                    <th>Status</th>
                                    <th>Applied On</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app.id} className="border-white/5 hover:bg-white/5">
                                        <td className="text-white font-medium">{app.companyName}</td>
                                        <td className="text-white/70">{app.jobTitle}</td>
                                        <td className="text-white/50 text-sm">{sourceLabel[app.source]}</td>
                                        <td>
                                            <span className={`badge ${statusBadgeClass[app.status]} badge-sm`}>
                                                {statusLabel[app.status]}
                                            </span>
                                        </td>
                                        <td className="text-white/50 text-sm">{new Date(app.applicationDate).toLocaleDateString()}</td>
                                        <td>
                                            <div className="flex justify-end gap-2">
                                                <Link to={`/dashboard/application/${app.id}`} className="btn btn-ghost btn-xs text-white/60 hover:bg-white/10 hover:text-white">
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Link>
                                                <button onClick={() => handleDelete(app.id, app.companyName)} className="btn btn-ghost btn-xs text-white/60 hover:bg-error/20 hover:text-error">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
