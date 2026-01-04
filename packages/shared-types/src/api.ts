export type ApiResponse<T> = {
    success: boolean;
    message: string | null;
    data: T | null;
    timestamp: string;
}

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}