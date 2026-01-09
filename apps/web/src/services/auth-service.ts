import { apiClient } from "@/lib/api-client";
import type { ApiResponse, ISigninRequest, IAuth as IAuthResponse } from "@repo/shared-types";

export const authService = {
    signin: async (data: ISigninRequest): Promise<IAuthResponse> => {
        const response = await apiClient.post<ApiResponse<IAuthResponse>>("/auth/signin", data);
        return response.data.data;
    },

    signout: async (): Promise<void> => {
        await apiClient.post<ApiResponse<{}>>("/auth/signout");
    }
}