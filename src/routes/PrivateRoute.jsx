import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { apiRequest } from "../lib/apiClient";
import Loading from "../components/Loading";

export default function PrivateRoute({ children }) {
    // Start as "checking" — never assume logged-out until we actually know
    const [isChecking, setIsChecking] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // No token at all — skip the API call, nothing to verify
            setIsChecking(false);
            setIsValid(false);
            return;
        }

        // Token exists — verify it's still valid before deciding anything.
        // While this is pending, we stay in "isChecking" state (shows Loading),
        // so the user never sees a login-page flash before the dashboard loads.
        apiRequest("/auth/me")
            .then(() => setIsValid(true))
            .catch(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setIsValid(false);
            })
            .finally(() => setIsChecking(false));
    }, []);

    // While checking (on every refresh), always show Loading — never redirect yet
    if (isChecking) {
        return <Loading />;
    }

    // Only after checking is done do we decide: redirect or let them through
    if (!isValid) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    return children;

}
