import { useAuthStore } from "../stores/auth-store";
import { useShallow } from "zustand/react/shallow";

export function useAuth() {
    const { user, isAuthenticated } = useAuthStore(
        useShallow((state) => ({
            user: state.user,
            isAuthenticated: state.isAuthenticated,
        }))
    );

    return {
        user,
        isAuthenticated,
    };
}