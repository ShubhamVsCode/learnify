import { Request } from 'express';
import { Document } from 'mongoose';

interface IUser extends Document {
    userId: string; 
    role: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
