import mongoose, {Schema, models, model} from "mongoose";

const EditorProfileSchema = new Schema({
    Skills: { type: [String], default: [] },

    RateType: {
        type: String,
        enum: ['per_project', 'per_hour', 'per_video'],

    },
    Rate: { type: Number, default: 0 },
    PortfolioLinks: { type: [String], default: [] },
    Available: { type: Boolean, default: true },
    Rating: { type: Number, default: 0 },
    ReviewsCount: { type: Number, default: 0 },

    
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