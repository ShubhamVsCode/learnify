import mongoose, { Document, Schema, Types } from 'mongoose';

interface ILesson extends Document {
    title: string;
    description?: string;
    lessonType: 'video' | 'pdf' | 'document';
    videoUrl?: string;
    pdfUrl?: string;
    documentUrl?: string;
    thumbnailUrl?: string;
    resources: Types.ObjectId[];
    assignments: Types.ObjectId[];
}

const lessonSchema: Schema<ILesson> = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    lessonType: { type: String, enum: ['video', 'pdf', 'document'], required: true },
    videoUrl: { type: String },
    pdfUrl: { type: String },
    documentUrl: { type: String },
    thumbnailUrl: { type: String },
    resources: [{
        type: Schema.Types.ObjectId,
        ref: 'Resource'
    }],
    assignments: [{
        type: Schema.Types.ObjectId,
        ref: 'Assignment'
    }],
});

const LessonModel = mongoose.model<ILesson>('Lesson', lessonSchema);

export default LessonModel;
