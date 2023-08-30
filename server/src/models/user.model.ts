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
    courseEnrolled?: string[];
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
        enum: [Role.SUPERADMIN, Role.ADMIN, Role.SUBADMIN, Role.USER],
    },
    courseEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
}, {
    timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
