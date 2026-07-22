import { useState } from "react";
import { Loader2 } from "lucide-react";
import { STATUS_OPTIONS, SOURCE_OPTIONS, statusLabel, sourceLabel } from "../lib/constants";

export default function ApplicationForm({ initialData, onSubmit, submitLabel }) {
    const [formData, setFormData] = useState({
        companyName: initialData?.companyName || "",
        jobTitle: initialData?.jobTitle || "",
        jobUrl: initialData?.jobUrl || "",
        source: initialData?.source || "OTHER",
        status: initialData?.status || "SAVED",
        applicationDate: initialData?.applicationDate
            ? initialData.applicationDate.slice(0, 10)
            : new Date().toISOString().slice(0, 10),
        notes: initialData?.notes || "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.companyName.trim() || !formData.jobTitle.trim()) {
            setError("Company name and job title are required.");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = "input w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary";
    const selectClass = "select w-full bg-white/5 border-white/10 text-white focus:border-primary";
    const labelClass = "text-sm text-white/70 mb-1 block";

    return (
        <form onSubmit={handleSubmit} className="glass-surface rounded-xl p-6 flex flex-col gap-4 max-w-2xl">
            {error && (
                <div className="alert alert-error alert-soft text-sm py-2">
                    <span>{error}</span>
                </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
                <div>
                    <label className={labelClass}>Company name *</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. Vercel" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>Job title *</label>
                    <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="e.g. Frontend Developer" className={inputClass} />
                </div>
            </div>

            <div>
                <label className={labelClass}>Job post URL</label>
                <input type="url" name="jobUrl" value={formData.jobUrl} onChange={handleChange} placeholder="https://..." className={inputClass} />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
                <div>
                    <label className={labelClass}>Source</label>
                    <select name="source" value={formData.source} onChange={handleChange} className={selectClass}>
                        {SOURCE_OPTIONS.map((s) => (
                            <option key={s} value={s} className="bg-[#171e29]">{sourceLabel[s]}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Status</label>
                    <select name="status" value={formData.status} onChange={handleChange} className={selectClass}>
                        {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s} className="bg-[#171e29]">{statusLabel[s]}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Application date</label>
                    <input type="date" name="applicationDate" value={formData.applicationDate} onChange={handleChange} className={inputClass} />
                </div>
            </div>

            <div>
                <label className={labelClass}>Notes</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Any extra details — referral name, salary range, interview prep..."
                    className="textarea w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                />
            </div>

            <button type="submit" className="btn btn-primary w-full sm:w-fit mt-2">
                {isSubmitting ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                    </>
                ) : (
                    submitLabel
                )}
            </button>
        </form>
    );
}
