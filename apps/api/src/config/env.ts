import "dotenv/config";

export const config = {
    port: process.env.PORT || 3001,
    env: process.env.ENV || 'development',
    corsOptions: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: process.env.CORS_CREDENTIALS === 'true',
    },
}