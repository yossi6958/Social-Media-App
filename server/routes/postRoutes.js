import express from 'express'
import verifyToken from '../middlewares/auth.js';
import { createPost, getPostsFeed, getUserPosts, likePost } from '../controllers/postsControllers.js';
import { addComment, likeComment, deleteComment } from '../controllers/commentControllers.js'

const router = express.Router();

router.post('/', verifyToken, createPost);
router.get('/', verifyToken, getPostsFeed);
router.get('/:userId', verifyToken, getUserPosts);
router.patch('/:id/like', verifyToken, likePost);

router.post('/comments/:postId', verifyToken, addComment);
router.patch('/comments/:commentId/like', verifyToken, likeComment);
router.delete('/comments/:commentId/delete', verifyToken, deleteComment);


export default router;
