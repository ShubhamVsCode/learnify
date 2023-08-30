import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import connectDb from './lib/db';
import userRouter from './routes/user.route';

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

app.get('/info', (req: Request, res: Response) => {
    res.json({ msg: 'Backend is Running Successfully!' });
})

app.listen(PORT, () => {
    connectDb()
    console.log('App listening on port 4000!')
})