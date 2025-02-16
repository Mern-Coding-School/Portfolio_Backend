import cookieParser from 'cookie-parser';
import express from 'express';
import { AuthRoutes } from '../api/v1/Auth/Auth.routes';
import { TokenRoutes } from '../api/v1/token/token.routes';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', AuthRoutes, TokenRoutes);

export default app;
