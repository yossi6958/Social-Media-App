import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({
    body: String,
    post: { type: mongoose.Schema.Types.ObjectId },
    user: { type: mongoose.Schema.Types.ObjectId },
    likes: { type: Map, of: Boolean, default: {} },
}, { timestamps: true, versionKey: false });


const CommentModel = mongoose.model('comments', commentSchema);
export default CommentModel;
