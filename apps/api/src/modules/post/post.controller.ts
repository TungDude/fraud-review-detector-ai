import { Request, Response } from "express";
import { asyncHandler } from "@/helpers/asyncHandler";
import * as PostService from "./post.service";

export const getPosts = asyncHandler(async (_: Request, res: Response) => {
    const posts = await PostService.getPosts();
    res.sendResponse(200, posts, "Posts retrieved successfully");
});