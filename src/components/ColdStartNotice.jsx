import { AlertCircle } from "lucide-react";

// Shown while the first request is in flight — Render free tier can take
// 30-50s to wake up from an idle state
export default function ColdStartNotice() {
    return (
        <div className="alert alert-warning alert-soft mb-6 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>
                Waking up the server — this can take up to 50 seconds on first load.
            </span>
        </div>
    );
}