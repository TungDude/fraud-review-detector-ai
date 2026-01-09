import {
    useQuery,
    type UseQueryResult,
} from '@tanstack/react-query';
import { userService } from '@/services/user-service';
import type { IUser } from '@repo/shared-types';
import { config } from '@/app/config/env';

export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
};

export const useUsers = (): UseQueryResult<
    IUser[],
    unknown
> => {
    return useQuery<IUser[]>({
        queryKey: userKeys.lists(),
        queryFn: () => userService.getUsers(),
        staleTime: config.defaultQueryStaleTime,
    });
}