import { Request, Response } from "express";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

// Middleware to check if the user is authenticated
export const authenticateUser = (req: Request, res: Response, next: any) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decodedToken: any = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Middleware to check if the user is an admin
export const isAdmin = (req: Request, res: Response, next: any) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};