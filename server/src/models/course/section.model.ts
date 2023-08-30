import mongoose, { Document, Schema, Types } from 'mongoose';

interface ISection extends Document {
    title: string;
    description?: string;
    lessons: Types.ObjectId[];
}

const sectionSchema: Schema<ISection> = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
});

const SectionModel = mongoose.model<ISection>('Section', sectionSchema);

export default SectionModel;
