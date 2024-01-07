import CommentModel from '../models/commentModel.js';
import PostModel from '../models/postModel.js'
import UserModel from '../models/userModel.js';
import { validateCreatePost } from '../services/postValidation.js'
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
});

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


export const createPost = async (req, res) => {
    const validBody = validateCreatePost(req.body)
    if (validBody.error) return res.status(400).json(validBody.error.details);

    try {
        const post = new PostModel(req.body);

        if (req.files) {
            const reqFile = req.files.picture;
            const file = await cloudinary.uploader.upload(reqFile.tempFilePath, { unique_filename: true });
            post.picturePath = file.secure_url;
        }

        post.user = req.tokenData._id;

        await post.save();

        const allPosts = await PostModel
            .find()
            .sort({ createdAt: -1 })
            .populate(configPopulate);

        res.status(201).json(allPosts);
    }
    catch (err) {
        res.status(409).json({ message: err.message });
    }
}


export const getPostsFeed = async (req, res) => {
    try {
        const allPosts = await PostModel
            .find()
            .sort({ createdAt: -1 })
            .populate(configPopulate);

        res.status(200).json(allPosts);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}


export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        const posts = await PostModel
            .find({ user: userId })
            .sort({ createdAt: -1 })
            .populate(configPopulate);

        res.status(200).json(posts);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};


export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.tokenData._id;

        const post = await PostModel.findById(id);
        if (!post) return res.status(404).json({ err: "post not found" });

        const isLiked = post.likes.get(userId);
        isLiked ? post.likes.delete(userId) : post.likes.set(userId, true);

        await post.save();

        const updatedPost = await PostModel
            .findById(id)
            .populate(configPopulate);

        res.status(200).json(updatedPost);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
};
