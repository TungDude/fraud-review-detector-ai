import express, { type Application } from 'express';
import cors from 'cors';
import { responseFormatterMiddleware } from '@/middlewares/response.middleware';
import { appRouter } from './routes/appRouter';
import { config } from '@/config/env';

export const createApp = (): Application => {
    const app = express();
    const corsOptions = config.corsOptions;

    app.use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(cors(corsOptions))
        .use(responseFormatterMiddleware)
        .use('/api', appRouter);

    return app;
}