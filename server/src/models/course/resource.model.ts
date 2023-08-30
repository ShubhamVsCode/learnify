import mongoose, { Document, Schema } from 'mongoose';

interface IResource extends Document {
    title: string;
    url: string;
    resourceType: 'video' | 'pdf' | 'document' | 'other';
}

const resourceSchema: Schema<IResource> = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    resourceType: {
        type: String,
        enum: ['video', 'pdf', 'document', 'other'],
        required: true,
    },
});

const ResourceModel = mongoose.model<IResource>('Resource', resourceSchema);

export default ResourceModel;
