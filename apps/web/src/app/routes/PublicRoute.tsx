import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { PATHS } from "@/app/routes/paths";

interface PublicRouteProps {
    children: React.ReactNode;
}

export function PublicRoute({ children }: Readonly<PublicRouteProps>) {
    const { isAuthenticated, user } = useAuth();

    if (isAuthenticated && user) {
        if (user.role === "CUSTOMER") {
            return <Navigate to={PATHS.customer} replace />;
        } else if (user.role === "MERCHANT") {
            return <Navigate to={PATHS.merchant} replace />;
        }
    }

    return <>{children}</>;
}