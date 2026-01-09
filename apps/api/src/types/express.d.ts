import type { IAuth } from "@repo/shared-types";

declare global {
    namespace Express {
        export interface Request {
            user?: IAuth;
        }

        export interface Response {
            sendResponse<T>(status: number, data: T, message?: string | null): Response;
        }
    }
}