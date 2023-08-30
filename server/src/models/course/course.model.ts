import mongoose, { Document, Schema, Types } from 'mongoose';

interface IThumbnail extends Document {
    title: string;
    url: string;
    thumbnailType: 'image' | 'video';
}

const thumbnailSchema: Schema<IThumbnail> = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    thumbnailType: { type: String, enum: ['image', 'video'], required: true },
});


interface ICourse extends Document {
    title: string;
    titleSlug: string;
    description: string;
    thumbnails: Types.ObjectId[];
    instructors: Types.ObjectId[];
    students: Types.ObjectId[];
    price: {
        IN: number;
        US: number;
        discount: number;
        isFree: boolean;
    };
    metaDataKeyValues: object[];
    showOnHomePage: boolean;
    active: boolean;
    tags: string[];
    sections: Types.ObjectId[];
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId[];
}

const courseSchema: Schema<ICourse> = new Schema(
    {
        title: { type: String, required: true },
        titleSlug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        thumbnails: [thumbnailSchema],
        instructors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        price: {
            IN: { type: Number, required: true },
            US: { type: Number, required: true },
            discount: { type: Number, default: 0 },
            isFree: { type: Boolean, default: false },
        },
        metaDataKeyValues: {
            type: [Object],
        },
        showOnHomePage: { type: Boolean, default: false },
        active: { type: Boolean, default: true },
        tags: [String],
        sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
        updatedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        // reviews: [reviewSchema],
        // certificates: [certificateSchema],
        // prerequisites: [requirementSchema],
        // skillsLearned: [String],
        // faqs: [
        //     {
        //         question: { type: String, required: true },
        //         answer: { type: String, required: true },
        //         videoAnswer: { type: String }
        //     },
        // ],
    },
    { timestamps: true }
);

const CourseModel = mongoose.model<ICourse>('Course', courseSchema);

export default CourseModel;
