import express, { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';

const userRouter = express.Router();

userRouter.post('/users', async (req: Request, res: Response) => {
    try {
        const { name, email, password }: IUser = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
});

export default userRouter;
