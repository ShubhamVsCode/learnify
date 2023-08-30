"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const resourceSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});
const assignmentSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    // submittionUrl: {
    //     type: String,
    //     required: true
    // },
});
const lessonSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    lessonType: {
        type: String,
        enum: ["video", "pdf", "document"]
    },
    videoUrl: {
        type: String
    },
    pdfUrl: {
        type: String
    },
    documentUrl: {
        type: String
    },
    thumbnailUrl: {
        type: String
    },
    resources: {
        type: [resourceSchema]
    },
    assignments: {
        type: [assignmentSchema]
    }
});
const sectionSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    lessons: [lessonSchema]
});
const courseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    titleSlug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String, required: true
    },
    thumbnails: {
        type: [{
                title: String,
                url: String,
                thumbnailType: {
                    type: String,
                    enum: ["image", "video"]
                },
            }]
    },
    instructors: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'User'
        }],
    students: [{
            type: mongoose_1.Schema.Types.ObjectId, ref: 'User'
        }],
    price: {
        IN: { type: Number, required: true },
        US: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        isFree: { type: Boolean, default: false },
    },
    showOnHomePage: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    tags: [{
            type: String
        }],
    sections: {
        type: [sectionSchema]
    },
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
}, { timestamps: true });
const CourseModel = mongoose_1.default.model('Course', courseSchema);
exports.default = CourseModel;