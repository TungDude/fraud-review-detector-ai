import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IAuth } from "@repo/shared-types";

interface AuthState {
    user: IAuth | null;
    isAuthenticated: boolean;
    setUser: (user: IAuth | null) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            setUser: (user: IAuth | null) => {
                set({
                    user,
                    isAuthenticated: user !== null,
                });
            },
            clearUser: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
        }
    )
);