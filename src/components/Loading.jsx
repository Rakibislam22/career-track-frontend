import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-white/50">
            <Loader2 className="h-6 w-6 animate-spin mb-3" />
            <p className="text-sm">Loading...</p>
        </div>
    );
}
