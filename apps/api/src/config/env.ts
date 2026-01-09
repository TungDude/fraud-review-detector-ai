import "dotenv/config";

export const config = {
    port: process.env.PORT || 3001,
    env: process.env.ENV || 'development',
    corsOptions: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: process.env.CORS_CREDENTIALS === 'true',
    },
    cookieName: process.env.COOKIE_NAME || 'frdai_token',
    cookieConfig: {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === 'true',
        sameSite: process.env.COOKIE_SAME_SITE as 'lax' | 'strict' | 'none' || 'lax',
        path: '/',
    },
    jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
}