import express, { type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { responseFormatterMiddleware } from '@/middlewares/response.middleware';
import { appRouter } from './routes/appRouter';
import { config } from '@/config/env';

export const createApp = (): Application => {
    const app = express();
    const corsOptions = config.corsOptions;

    app.use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(cookieParser())
        .use(cors(corsOptions))
        .use(responseFormatterMiddleware)
        .use('/api', appRouter);
    
    console.log(`CORS:`, corsOptions);

    return app;
}