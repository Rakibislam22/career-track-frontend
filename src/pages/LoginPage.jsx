import { useEffect, useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { apiRequest } from "../lib/apiClient";
import AuthLayout from "../layouts/AuthLayout";
import { Link } from "react-router";
import ColdStartNotice from "../components/ColdStartNotice";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showColdStart, setShowColdStart] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        const coldStartTimer = setTimeout(() => setShowColdStart(true), 3000);

        // Clear notice if request is fast
        const cleanup = () => clearTimeout(coldStartTimer);

        try {
            const data = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            // Store token + user — replace with your context/reducer dispatch if using one
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            window.location.href = "/dashboard";
        } catch (err) {
            setError(err.message);
            cleanup();
        } finally {
            setIsSubmitting(false);
            setShowColdStart(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Sign in to keep tracking your applications."
        >
            {showColdStart && <ColdStartNotice />}
            {error && (
                <div className="alert alert-error alert-soft mb-4 text-sm py-2">
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="text-sm text-white/70 mb-1 block">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className="input w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                    />
                </div>

                <div>
                    <label className="text-sm text-white/70 mb-1 block">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="input w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    
                    className="btn btn-primary w-full mt-2"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Signing in...
                        </span>
                    ) : (
                        "Sign in"
                    )}
                </button>
            </form>

            <p className="text-sm text-white/50 text-center mt-6">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                    Create one
                </Link>
            </p>
        </AuthLayout>
    );
}