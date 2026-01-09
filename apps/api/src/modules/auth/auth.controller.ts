import { Request, Response } from "express";
import { asyncHandler } from "@/helpers/asyncHandler";
import { ApiError, type ISigninRequest } from "@repo/shared-types";
import { config } from "@/config/env";
import jwt from "jsonwebtoken";
import * as AuthService from "./auth.service";

export const signin = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.body as ISigninRequest;

    if (!username) {
        throw new ApiError("Username is required", 400);
    }

    const user = await AuthService.signin(username);

    if (!user) {
        throw new ApiError("Invalid username", 401);
    }

    const token = jwt.sign(
        {
            userId: user.userId,
            username: user.username,
            role: user.role,
        },
        config.jwtSecret,
        {
            expiresIn: "1d",
        }
    );

    try {
        res.cookie(config.cookieName, token, config.cookieConfig);
        res.sendResponse(200, user, "Signin successful");
    } catch (error) {
        console.error(`Error setting cookie for ${user.username}:`, error);
        throw new ApiError("Failed to set cookie", 500);
    }
});

export const signout = asyncHandler(async (_: Request, res: Response) => {
    try {
        res.clearCookie(config.cookieName, config.cookieConfig);
        res.sendResponse(200, {}, "Signout successful");
    } catch (error) {
        console.error("Error clearing cookie during signout:", error);
        throw new ApiError("Failed to clear cookie", 500);
    }
});