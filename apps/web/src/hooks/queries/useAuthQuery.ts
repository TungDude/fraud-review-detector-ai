import {
    useQueryClient,
    useMutation,
    UseMutationResult,
} from "@tanstack/react-query";
import { authService } from "@/services/auth-service";
import { useAuthStore } from "@/stores/auth-store";
import type { IAuth, ISigninRequest } from "@repo/shared-types";

export const authKeys = {
    all: ["auth"] as const,
    user: (username: string) => [...authKeys.all, "user", username] as const,
}

export const useSignin = (): UseMutationResult<
    IAuth,
    unknown,
    ISigninRequest,
    unknown
> => {
    const queryClient = useQueryClient();
    const { setUser} = useAuthStore();

    return useMutation({
        mutationFn: (data: ISigninRequest) => authService.signin(data),
        onSuccess: (data: IAuth) => {
            setUser(data);
            queryClient.setQueryData(authKeys.user(data.username), data);
        },
    });
};

export const useSignout = (): UseMutationResult<void, unknown, void, unknown> => {
    const queryClient = useQueryClient();
    const { clearUser } = useAuthStore();

    return useMutation({
        mutationFn: () => authService.signout(),
        onSuccess: () => {
            clearUser();
            queryClient.invalidateQueries({ queryKey: authKeys.all });
        }
    });
};