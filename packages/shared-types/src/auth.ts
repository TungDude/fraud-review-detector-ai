export interface IAuth {
    userId: string;
    username: string;
    role: "CUSTOMER" | "MERCHANT";
};

export interface ISigninRequest {
    username: string;
}