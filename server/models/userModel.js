import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    picturePath: String,
    friends: Array,
    location: String,
    occupation: String,
    // viewedProfile: Number,
    // impressions: Number,
}, { timestamps: true, versionKey: false })

const UserModel = mongoose.model('users', UserSchema);
export default UserModel;
