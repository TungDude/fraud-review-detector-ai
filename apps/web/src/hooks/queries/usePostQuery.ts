import {
    useQueryClient,
    useQuery,
    useMutation,
    type UseQueryResult,
    type UseMutationResult,
} from '@tanstack/react-query';
import { postService } from '@/services/post-service';
import type { IPostWithRelations, IPost, ICreatePostRequest } from '@repo/shared-types';
import { config } from '@/app/config/env';

export const postKeys = {
    all: ['posts'] as const,
    lists: () => [...postKeys.all, 'list'] as const,
    merchant: (userId: string) => [...postKeys.all, 'merchant', userId] as const,
    merchants: () => [...postKeys.all, 'merchant'] as const,
};

export const usePosts = (): UseQueryResult<
    IPostWithRelations[],
    unknown
> => {
    return useQuery<IPostWithRelations[]>({
        queryKey: postKeys.lists(),
        queryFn: () => postService.getPosts(),
        staleTime: config.defaultQueryStaleTime,
    });
}

export const useMerchantPosts = (userId: string): UseQueryResult<
    IPostWithRelations[],
    unknown
> => {
    return useQuery<IPostWithRelations[]>({
        queryKey: postKeys.merchant(userId),
        queryFn: () => postService.getMerchantPosts(),
        staleTime: config.defaultQueryStaleTime,
    });
}

export const useCreatePost = (userId: string): UseMutationResult<
    IPost,
    unknown,
    ICreatePostRequest,
    unknown
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ICreatePostRequest) => postService.createPost(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: postKeys.merchant(userId) });
        },
    });
}