import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Loader2 } from "lucide-react";
import ApplicationForm from "../components/ApplicationForm";
import { apiRequest } from "../lib/apiClient";

export default function ApplicationFormPage() {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();

    const [initialData, setInitialData] = useState(null);
    const [isLoading, setIsLoading] = useState(isEditMode);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isEditMode) return;

        apiRequest(`/applications/${id}`)
            .then((data) => setInitialData(data.application))
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, [id, isEditMode]);

    const handleSubmit = async (formData) => {
        if (isEditMode) {
            await apiRequest(`/applications/${id}`, {
                method: "PATCH",
                body: JSON.stringify(formData),
            });
            navigate(`/dashboard/application/${id}`);
        } else {
            const data = await apiRequest("/applications", {
                method: "POST",
                body: JSON.stringify(formData),
            });
            navigate(`/dashboard/application/${data.application.id}`);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-white/50">
                <Loader2 className="h-6 w-6 animate-spin mb-3" />
                <p className="text-sm">Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-1">
                {isEditMode ? "Edit Application" : "Add Application"}
            </h1>
            <p className="text-white/50 text-sm mb-6">
                {isEditMode ? "Update the details of this application." : "Log a new job application to your tracker."}
            </p>

            {error && (
                <div className="alert alert-error alert-soft mb-6 text-sm max-w-2xl">
                    <span>{error}</span>
                </div>
            )}

            <ApplicationForm
                initialData={initialData}
                onSubmit={handleSubmit}
                submitLabel={isEditMode ? "Save changes" : "Add application"}
            />
        </div>
    );
}
