import { Request, Response } from "express";
import { asyncHandler } from "@/helpers/asyncHandler";
import * as UserService from "./user.service";

export const getUsers = asyncHandler(async (_: Request, res: Response) => {
    const users = await UserService.getUsers();
    res.sendResponse(200, users, "Users retrieved successfully");
});