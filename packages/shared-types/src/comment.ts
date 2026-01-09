import { IUser } from "./user";

export interface ICommentsRequest {
    postId: string;
}

export interface IComment {
    commentId: string;
    postId: string;
    userId: string;
    text: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
}

export interface ICommentWithRelations extends IComment {
    user: IUser;
}

export interface ICreateCommentRequest {
    postId: string;
    text: string;
    rating: number;
}