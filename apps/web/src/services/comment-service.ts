import { apiClient } from "@/lib/api-client";
import type {
    ApiResponse,
    ICommentWithRelations,
    ICommentsRequest, 
    ICreateCommentRequest
} from "@repo/shared-types";

export const commentService = {
    getComments: async (params: ICommentsRequest): Promise<ICommentWithRelations[]> => {
        const response = await apiClient.get<ApiResponse<ICommentWithRelations[]>>("/comments", { params });
        return response.data.data;
    },

    createComment: async (data: ICreateCommentRequest): Promise<ICommentWithRelations> => {
        const response = await apiClient.post<ApiResponse<ICommentWithRelations>>("/comments", data);
        return response.data.data;
    }
}