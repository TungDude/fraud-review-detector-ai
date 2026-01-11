import { Request, Response } from "express";
import { asyncHandler } from "@/helpers/asyncHandler";
import { ApiError, type ICreateCommentRequest } from "@repo/shared-types";
import * as CommentService from "./comment.service";

export const getComments = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.query;  

    if (!postId) {
        throw new ApiError("postId is required", 400);
    }

    const comments = await CommentService.getComments(postId as string);
    res.sendResponse(200, comments, "Comments retrieved successfully");
});

export const createComment = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { postId, text, rating } = req.body as ICreateCommentRequest;

    if (!postId || !text || rating === undefined) {
        throw new ApiError("postId, text and rating are required", 400);
    }

    const comment = await CommentService.createComment(user!.userId, postId, text, rating);
    res.sendResponse(201, comment, "Comment created successfully");
});