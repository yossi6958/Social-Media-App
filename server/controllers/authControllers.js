import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import {
  validateLogin,
  validateRegister,
} from "../services/userValidations.js";
import { createToken } from "../services/createToken.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const register = async (req, res) => {
  const validBody = validateRegister(req.body);
  if (validBody.error) return res.status(400).json(validBody.error.details);

  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in system" });
    }
    const user = new UserModel(req.body);

    if (req.files) {
      const reqFile = req.files.picture;
      const file = await cloudinary.uploader.upload(reqFile.tempFilePath, {
        unique_filename: true,
      });
      user.picturePath = file.secure_url;
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    user.password = "********";

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const login = async (req, res) => {
  const validBody = validateLogin(req.body);
  if (validBody.error) return res.status(400).json(validBody.error.details);

  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = createToken(user.id);
    user.password = "********";

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ err });
  }
};
