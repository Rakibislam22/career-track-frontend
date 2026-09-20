import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthInput({
    id,
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false,
    autoComplete,
    inputMode,
    autoCapitalize,
    minLength,
    error,
    disabled = false,
}) {
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-white/90 cursor-pointer select-none"
                >
                    {label} {required && <span className="text-primary" aria-hidden="true">*</span>}
                </label>
            </div>

            <div className="relative flex items-center">
                <input
                    id={id}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    inputMode={inputMode}
                    autoCapitalize={autoCapitalize}
                    minLength={minLength}
                    className={`input w-full bg-white/5 border text-white placeholder:text-white/30 transition-all text-sm rounded-lg ${error
                            ? "border-error focus:border-error focus-visible:ring-2 focus-visible:ring-error/30"
                            : "border-white/10 hover:border-white/20 focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/30"
                        } ${isPassword ? "pr-11" : "pr-4"} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={disabled}
                        className="absolute right-1 top-1/2 -translate-y-1/2 min-h-[40px] min-w-[40px] flex items-center justify-center text-white/50 hover:text-white focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                        ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p id={`${id}-error`} className="text-xs text-error mt-0.5" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

