import { Request, Response } from "express";
import { asyncHandler } from "@/helpers/asyncHandler";

export const healthCheck = asyncHandler(async(_: Request, res: Response) => {
    res.sendResponse(200, { status: "OK" }, "Service is healthy");
});