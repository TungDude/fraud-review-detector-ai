import { Request, Response } from "express";
import { asyncHandler } from "@/helpers/asyncHandler";
import { ApiError, type ICreatePostRequest } from "@repo/shared-types";
import * as PostService from "./post.service";

export const getPosts = asyncHandler(async (_: Request, res: Response) => {
    const posts = await PostService.getPosts();
    res.sendResponse(200, posts, "Posts retrieved successfully");
});

export const getMerchantPosts = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;

    if (user!.role !== "MERCHANT") {
        throw new ApiError("Only merchants can access their posts", 403);
    }
    
    const posts = await PostService.getMerchantPosts(user!.userId);
    res.sendResponse(200, posts, "Merchant posts retrieved successfully");
});

export const createPost = asyncHandler(async (req: Request, res: Response) => {
    const user = req.user;
    const { title, content } = req.body as ICreatePostRequest;

    if (!title || !content) {
        throw new ApiError("title and content are required", 400);
    }

    const post = await PostService.createPost(user!.userId, title, content);
    res.sendResponse(201, post, "Post created successfully");
});