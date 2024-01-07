import UserModel from '../models/userModel.js';


export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        user.password = "********";
        res.status(200).json(user);
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
}


export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => UserModel.findById(id))
        );

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        )
        res.json(formattedFriends);
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
}


export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await UserModel.findById(id);
        const friend = await UserModel.findById(friendId);
    
        if (user.friends.includes(friendId)) {
          user.friends = user.friends.filter((id) => id !== friendId);
          friend.friends = friend.friends.filter((id) => id !== id);
        }
        else {
          user.friends.push(friendId);
          friend.friends.push(id);
        }
        await user.save();
        await friend.save();
    
        const friends = await Promise.all(
          user.friends.map((id) => UserModel.findById(id))
        );
        const formattedFriends = friends.map(
          ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
          }
        );
        res.status(200).json(formattedFriends);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
    }
}