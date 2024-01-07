import CommentModel from '../models/commentModel.js';
import PostModel from '../models/postModel.js'
import UserModel from '../models/userModel.js';


const configPopulate = [
    {
        path: 'user',
        model: UserModel,
        select: '-password'
    },
    {
        path: 'comments',
        model: CommentModel,
        populate: {
            path: 'user',
            model: UserModel,
            select: '-password'
        }
    },
];


export const addComment = async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await PostModel.findById(postId);
        if (!post) return res.status(404).json({ err: "post not found" });

        const comment = new CommentModel(req.body);
        comment.post = post._id;
        comment.user = req.tokenData._id;

        post.comments.push(comment._id);

        await post.save();
        await comment.save();

        const updatedPost = await PostModel
            .findById(postId)
            .populate(configPopulate);

        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const likeComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.tokenData._id;

        const comment = await CommentModel.findById(commentId);
        if (!comment) return res.status(404).json({ err: "comment not found" });


        const isLiked = comment.likes.get(userId);
        isLiked ? comment.likes.delete(userId) : comment.likes.set(userId, true);

        await comment.save();

        const updatedPost = await PostModel
        .findById(comment.post)
        .populate(configPopulate);

        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        const comment = await CommentModel.findById(commentId);
        if (!comment) return res.status(404).json({ err: "comment not found" });

        const post = await PostModel.findById(comment.post);
        if (!post) return res.status(404).json({ err: "post not found" });

        post.comments.pull(commentId);
        await CommentModel.findByIdAndDelete(commentId);
        await post.save();


        const updatedPost = await PostModel
        .findById(comment.post)
        .populate(configPopulate);
        
        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
