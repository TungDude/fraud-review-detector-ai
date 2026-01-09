export type UserRole = "customer" | "merchant";

export interface IUser {
    userId: string;
    username: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}