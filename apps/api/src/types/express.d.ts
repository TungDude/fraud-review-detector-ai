declare namespace Express {
    export interface Response {
        sendResponse<T>(status: number, data: T | null, message?: string | null): Response;
    }
}