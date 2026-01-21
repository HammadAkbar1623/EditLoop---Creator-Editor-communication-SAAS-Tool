import mongoose, {Schema, models, model} from "mongoose";

const EditorProfileSchema = new Schema({
    skills: { type: [String], default: [] },

    rateType: {
        type: String,
        enum: ['per_project', 'per_hour', 'per_video'],

    },
    rate: { type: Number, default: 0 },
    portfolioLinks: { type: [String], default: [] },
    available: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    
},
    {_id: false},
)

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
        type: String,
        enum: ['editor', 'creator'],
        required: true,
    },
    editorProfile: {
        type: EditorProfileSchema,
        required: false,
    }
},
    { timestamps: true }
)


const User = models.User || model('User', UserSchema);
export default User;