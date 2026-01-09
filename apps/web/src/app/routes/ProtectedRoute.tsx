import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "@/app/routes/paths";

interface ProtectedRouteProps {
    roles?: Array<"MERCHANT" | "CUSTOMER">;
};

export function ProtectedRoute({ roles }: Readonly<ProtectedRouteProps>) {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated || !user) {
        return <Navigate to={PATHS.auth} replace />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to={PATHS.auth} replace />;
    }

    return <Outlet />;
}