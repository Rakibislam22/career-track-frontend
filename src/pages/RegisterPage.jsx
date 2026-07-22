import { useState } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { apiRequest } from "../lib/apiClient";
import AuthLayout from "../layouts/AuthLayout";
import { Link } from "react-router";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Client-side validation — mirrors backend's minimums (Zod: name 2+, password 6+)
        if (formData.name.trim().length < 2) {
            setError("Name must be at least 2 characters.");
            return;
        }
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setIsSubmitting(true);
        try {
            const data = await apiRequest("/auth/register", {
                method: "POST",
                body: JSON.stringify(formData),
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            window.location.href = "/dashboard";
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout
            title="Create your account"
            subtitle="Start tracking your job applications in one place."
        >
            {error && (
                <div className="alert alert-error alert-soft mb-4 text-sm py-2">
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="text-sm text-white/70 mb-1 block">Full name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Rakib Hasan"
                        className="input w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-primary"
                    />
                </div>

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
                            minLength={6}
                            placeholder="At least 6 characters"
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
                    disabled={isSubmitting}
                    className="btn btn-primary w-full mt-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Create account"
                    )}
                </button>
            </form>

            <p className="text-sm text-white/50 text-center mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
}
