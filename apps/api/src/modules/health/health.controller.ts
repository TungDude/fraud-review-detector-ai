import { Request, Response } from "express";
import { asyncHandler } from "@/helpers/asyncHandler";
import * as HealthService from "./health.service";

export const healthCheck = asyncHandler(async(_: Request, res: Response) => {
    const healthStatus = await HealthService.HealthService.check();
    res.sendResponse(200, healthStatus, "Service is healthy");
});