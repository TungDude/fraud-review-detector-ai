import { Response } from "express";
import { ApiResponse } from "@repo/shared-types";

export const sendResponse = <T>(res: Response, status: number, data: T, message: string | null = null) => {
    const response: ApiResponse<T> = {
        success: status >= 200 && status < 300,
        message,
        data,
        timestamp: new Date().toISOString()
    };

    return res.status(status).json(response);
};