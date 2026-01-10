import { apiClient } from "@/lib/api-client";
import type { ApiResponse, IPost, IPostWithRelations, ICreatePostRequest } from "@repo/shared-types";

export const postService = {
    getPosts: async (): Promise<IPostWithRelations[]> => {
        const response = await apiClient.get<ApiResponse<IPostWithRelations[]>>("/posts");
        return response.data.data;
    },

    getMerchantPosts: async (): Promise<IPostWithRelations[]> => {
        const response = await apiClient.get<ApiResponse<IPostWithRelations[]>>("/posts/merchant");
        return response.data.data;
    },

    createPost: async (data: ICreatePostRequest): Promise<IPost> => {
        const response = await apiClient.post<ApiResponse<IPost>>("/posts", data);
        return response.data.data;
    }
}