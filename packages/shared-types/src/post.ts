import type { IUser } from "./user";

export interface IPost {
    postId: string;
    authorId: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    stats: {
        commentsCount: number;
        averageRating: number | null;
    }
}

export interface IPostWithRelations extends IPost {
    author: IUser;
}