import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Pencil, Trash2, ExternalLink, Loader2, Sparkles } from "lucide-react";
import Swal from "sweetalert2";
import { apiRequest } from "../lib/apiClient";
import { statusBadgeClass, statusLabel, sourceLabel, swalDarkTheme } from "../lib/constants";

export default function ApplicationDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [application, setApplication] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [aiResearch, setAiResearch] = useState(null);
    const [isResearching, setIsResearching] = useState(false);
    const [researchError, setResearchError] = useState("");

    useEffect(() => {
        apiRequest(`/applications/${id}`)
            .then((data) => setApplication(data.application))
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, [id]);

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Delete this application?",
            text: `Your application to ${application.companyName} will be permanently removed.`,
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
            await Swal.fire({ title: "Deleted", text: "The application has been removed.", icon: "success", ...swalDarkTheme });
            navigate("/dashboard/applications");
        } catch (err) {
            Swal.fire({ title: "Error", text: err.message, icon: "error", ...swalDarkTheme });
        }
    };

    const handleAiResearch = async () => {
        setIsResearching(true);
        setResearchError("");
        setAiResearch(null);
        try {
            const res = await apiRequest("/applications/research", {
                method: "POST",
                body: JSON.stringify({ companyName: application.companyName }),
            });
            setAiResearch(res.data);
        } catch (err) {
            setResearchError(err.message);
        } finally {
            setIsResearching(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-white/50">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p className="text-base">Loading application...</p>
            </div>
        );
    }

    if (error || !application) {
        return (
            <div className="alert alert-error alert-soft text-base max-w-2xl">
                <span>{error || "Application not found."}</span>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <Link to="/dashboard/applications" className="inline-flex items-center gap-2 text-base text-white/50 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to all applications
            </Link>

            <div className="glass-surface rounded-xl p-6">
                <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">{application.companyName}</h1>
                        <p className="text-lg text-white/60">{application.jobTitle}</p>
                    </div>
                    <span className={`badge ${statusBadgeClass[application.status]} badge-lg`}>
                        {statusLabel[application.status]}
                    </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6 text-base">
                    <div>
                        <p className="text-white/40 mb-1">Source</p>
                        <p className="text-white">{sourceLabel[application.source]}</p>
                    </div>
                    <div>
                        <p className="text-white/40 mb-1">Application date</p>
                        <p className="text-white">{new Date(application.applicationDate).toLocaleDateString()}</p>
                    </div>
                    {application.jobUrl && (
                        <div className="sm:col-span-2">
                            <p className="text-white/40 mb-1">Job posting</p>
                            <a href={application.jobUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline break-all">
                                {application.jobUrl}
                                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                            </a>
                        </div>
                    )}
                    {application.notes && (
                        <div className="sm:col-span-2">
                            <p className="text-white/40 mb-1">Notes</p>
                            <p className="text-white/80 whitespace-pre-wrap text-base">{application.notes}</p>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                    <Link to={`/dashboard/application/${id}/edit`} className="btn btn-outline border-white/20 text-white hover:bg-white/10 gap-2">
                        <Pencil className="h-4 w-4" />
                        Edit
                    </Link>
                    <button onClick={handleDelete} className="btn btn-outline border-error/40 text-error hover:bg-error/10 gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </button>
                </div>
            </div>

            <div className="glass-surface rounded-xl p-6 mt-6">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <h2 className="text-xl font-semibold text-white">AI Assistant</h2>
                </div>
                {!aiResearch && !isResearching && !researchError && (
                    <p className="text-base text-white/50 mb-4">Get AI-powered insights about the company and potential interview questions.</p>
                )}

                {isResearching && (
                    <div className="flex items-center gap-2 text-white/60 text-base">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Researching...</span>
                    </div>
                )}

                {researchError && <div className="alert alert-error alert-soft text-base"><span>{researchError}</span></div>}

                {aiResearch && (
                    <div className="flex flex-col gap-4 text-base">
                        <div>
                            <h3 className="font-semibold text-white mb-1">Company Info</h3>
                            <p className="text-white/70 whitespace-pre-wrap">{aiResearch.companyInfo}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-white mb-1">Related Questions</h3>
                            <ul className="list-disc list-inside flex flex-col gap-2 text-white/70">
                                {aiResearch.relatedQuestions.map((q, i) => <li key={i}>{q}</li>)}
                            </ul>
                        </div>
                    </div>
                )}

                {!isResearching && <button onClick={handleAiResearch} className="btn btn-primary mt-4 gap-2"><Sparkles className="h-4 w-4" /> Know about company by AI</button>}
            </div>
        </div>
    );
}
