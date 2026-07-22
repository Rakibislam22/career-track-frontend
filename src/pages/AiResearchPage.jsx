import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { apiRequest } from "../lib/apiClient";

export default function AiResearchPage() {
    const [companyName, setCompanyName] = useState("");
    const [aiResearch, setAiResearch] = useState(null);
    const [isResearching, setIsResearching] = useState(false);
    const [researchError, setResearchError] = useState("");

    const handleAiResearch = async (e) => {
        e.preventDefault();
        if (!companyName.trim()) {
            setResearchError("Please enter a company name.");
            return;
        }
        setIsResearching(true);
        setResearchError("");
        setAiResearch(null);
        try {
            const res = await apiRequest("/applications/research", {
                method: "POST",
                body: JSON.stringify({ companyName }),
            });
            setAiResearch(res.data);
        } catch (err) {
            setResearchError(err.message);
        } finally {
            setIsResearching(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-white">AI Company Research</h1>
            </div>
            <p className="text-base text-white/50 mb-6">
                Enter a company name to get AI-powered insights and potential interview questions.
            </p>

            <form onSubmit={handleAiResearch} className="glass-surface rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apple, Microsoft, etc."
                    className="input flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                    disabled={isResearching}
                />
                <button type="submit" disabled={isResearching || !companyName.trim()} className="btn btn-primary gap-2">
                    {isResearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    <span>{isResearching ? "Researching..." : "Research Company"}</span>
                </button>
            </form>

            {researchError && <div className="alert alert-error alert-soft text-base mb-6"><span>{researchError}</span></div>}

            {aiResearch && (
                <div className="glass-surface rounded-xl p-6 mt-6 flex flex-col gap-6 text-base">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Company Info</h3>
                        <p className="text-white/70 whitespace-pre-wrap">{aiResearch.companyInfo}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-2">Related Questions</h3>
                        <ul className="list-disc list-inside flex flex-col gap-3 text-white/70">
                            {aiResearch.relatedQuestions.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}