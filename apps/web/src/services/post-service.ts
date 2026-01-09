import { apiClient } from "@/lib/api-client";
import type { ApiResponse, IPostWithRelations } from "@repo/shared-types";

export const postService = {
    getPosts: async (): Promise<IPostWithRelations[]> => {
        const response = await apiClient.get<ApiResponse<IPostWithRelations[]>>("/posts");
        return response.data.data;
    },
}