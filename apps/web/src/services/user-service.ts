import { apiClient } from "@/lib/api-client";
import type { ApiResponse, IUser } from "@repo/shared-types";

export const userService = {
    getUsers: async (): Promise<IUser[]> => {
        const response = await apiClient.get<ApiResponse<IUser[]>>("/users");
        return response.data.data;
    },
}