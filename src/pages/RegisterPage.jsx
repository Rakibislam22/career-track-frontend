import { useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { apiRequest } from "../lib/apiClient";
import AuthLayout from "../layouts/AuthLayout";
import { Link } from "react-router";
import ColdStartNotice from "../components/ColdStartNotice";
import AuthInput from "../components/AuthInput";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showColdStart, setShowColdStart] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Client-side validation — mirrors backend's minimums (Zod: name 2+, password 6+)
        if (formData.name.trim().length < 2) {
            setError("Full name must be at least 2 characters.");
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setIsSubmitting(true);

        const coldStartTimer = setTimeout(() => setShowColdStart(true), 3000);
        const cleanup = () => clearTimeout(coldStartTimer);

        try {
            const data = await apiRequest("/auth/register", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            window.location.href = "/dashboard";
        } catch (err) {
            setError(err.message || "Failed to create account. Please try again.");
            cleanup();
        } finally {
            setIsSubmitting(false);
            setShowColdStart(false);
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Start tracking all your job applications in one organized place."
        >
            {showColdStart && <ColdStartNotice />}

            {error && (
                <div
                    className="alert alert-error alert-soft mb-5 text-sm py-2.5 px-4 flex items-center gap-2 rounded-lg border border-error/30"
                    role="alert"
                    aria-live="polite"
                >
                    <AlertCircle className="h-4 w-4 shrink-0 text-error" aria-hidden="true" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <AuthInput
                    id="register-name"
                    label="Full name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Alex Johnson"
                    autoComplete="name"
                    disabled={isSubmitting}
                />

                <AuthInput
                    id="register-email"
                    label="Email address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    disabled={isSubmitting}
                />

                <AuthInput
                    id="register-password"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    disabled={isSubmitting}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full mt-3 min-h-[44px] shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Creating account...
                        </span>
                    ) : (
                        "Create account"
                    )}
                </button>
            </form>

            <div className="pt-6 mt-6 border-t border-white/10 text-center">
                <p className="text-sm text-white/70">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary rounded px-1 py-0.5"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
