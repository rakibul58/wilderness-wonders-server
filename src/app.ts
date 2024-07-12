import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173', 'https://wilderness-wonders.vercel.app'] }));
app.use(cookieParser());

//application routes
app.use(`/api/v1`, router);

app.get('/', (req: Request, res: Response) => {
  res.send('Wilderness Wonders server is running!');
});

// middlewares
app.use(globalErrorHandler);
app.use(notFound);

export default app;
