import {
    useQuery,
    type UseQueryResult,
} from '@tanstack/react-query';
import { postService } from '@/services/post-service';
import type { IPostWithRelations } from '@repo/shared-types';
import { config } from '@/app/config/env';

export const postKeys = {
    all: ['posts'] as const,
    lists: () => [...postKeys.all, 'list'] as const,
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