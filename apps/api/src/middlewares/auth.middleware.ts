import { Request, Response, NextFunction } from "express";
import { ApiError, type IAuth } from "@repo/shared-types";
import { config } from "@/config/env";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies[config.cookieName];

    if (!token) {
        throw new ApiError("Authentication token is missing", 401);
    }

    try {
        const user = jwt.verify(token, config.jwtSecret) as IAuth;

        if (!user?.userId || !user?.role) {
            throw new ApiError("Unauthorized", 401);
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(error instanceof Error ? error.message : String(error), 401);
    }
}