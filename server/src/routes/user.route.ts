import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { authenticateUser, isAdmin } from '../middleware/auth/user.middleware';


const userRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET as string

// Register a new user
userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create the user
        const user = await User.create({ name, email, password: hashedPassword });

        // Create and send JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);

        // Return a success response
        return res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Register a new user
userRouter.post('/register/admin', async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create the user
        const user = await User.create({ name, email, password: hashedPassword, role: "admin" });

        // Create and send JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);

        // Return a success response
        return res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Login
userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create and send JWT token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET);
        return res.status(200).json({ token, user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Get authenticated user's information
userRouter.get('/me', authenticateUser, async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    try {
        const user = await User.findById(userId).select('-password').exec();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Get user's information (admin only)
userRouter.get('/:userId', authenticateUser, isAdmin, async (req: Request, res: Response) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId).select('-password').exec();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default userRouter