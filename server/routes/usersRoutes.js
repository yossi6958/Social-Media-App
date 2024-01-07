import express from 'express'
import verifyToken from '../middlewares/auth.js'
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/usersControllers.js';

const router = express.Router();

router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);


export default router;
