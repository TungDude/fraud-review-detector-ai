import {
    useQueryClient,
    useQuery,
    useMutation,
    type UseQueryResult,
    type UseMutationResult,
} from '@tanstack/react-query';
import { commentService } from '@/services/comment-service';
import type {
    IComment,
    ICommentWithRelations,
    ICreateCommentRequest
} from '@repo/shared-types';
import { postKeys } from './usePostQuery';
import { config } from '@/app/config/env';

export const commentKeys = {
    all: ['comments'] as const,
    list: (postId: string) => [...commentKeys.all, 'list', postId] as const,
    lists: () => [...commentKeys.all, 'list'] as const,
};

export const useComments = (postId: string): UseQueryResult<
    ICommentWithRelations[],
    unknown
> => {
    return useQuery<ICommentWithRelations[]>({
        queryKey: commentKeys.list(postId),
        queryFn: () => commentService.getComments({ postId }),
        staleTime: config.defaultQueryStaleTime,
        enabled: !!postId,
    });
}

export const useCreateComment = (postId: string): UseMutationResult<
    IComment,
    unknown,
    Omit<ICreateCommentRequest, 'postId'>,
    unknown
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<ICreateCommentRequest, 'postId'>) => commentService.createComment({ ...data, postId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: commentKeys.list(postId) });
            queryClient.invalidateQueries({ queryKey: postKeys.lists() });
            queryClient.invalidateQueries({ queryKey: postKeys.merchants() });
        },
    });
}