import type { IUser } from "./user";

export interface IPost {
    postId: string;
    authorId: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface IPostWithStats extends IPost {
    stats: {
        commentsCount: number;
        fraudCommentsPercentage: number | null;
        averageRating: number | null;
    }
}

export interface IPostWithRelations extends IPostWithStats {
    author: IUser;
}

export interface ICreatePostRequest {
    title: string;
    content: string;
}