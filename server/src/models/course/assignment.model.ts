import mongoose, { Document, Schema } from 'mongoose';

export interface IAssignment extends Document {
    title: string;
    description?: string;
    url: string;
    submissionUrl?: string;
    deadline?: Date;
    maxScore: number;
}

const assignmentSchema: Schema<IAssignment> = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    submissionUrl: { type: String },
    deadline: { type: Date },
    maxScore: { type: Number, required: true },
});

const AssignmentModel = mongoose.model<IAssignment>('Assignment', assignmentSchema);

export default AssignmentModel;
