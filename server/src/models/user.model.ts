import mongoose, { Schema, Document } from 'mongoose';

enum Role {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    SUBADMIN = "subadmin",
    USER = "user"
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
    courseCreated?: string[]; // Optional array of course IDs created by admin
    courseEnrolled?: string[]; // Optional array of course IDs enrolled by user
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: Role.USER,
        enum: [Role.ADMIN, Role.SUPERADMIN, Role.SUBADMIN, Role.USER],
    },
    courseCreated: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    courseEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
}, {
    timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
