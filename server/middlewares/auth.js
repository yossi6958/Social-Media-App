import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const verifyToken = async(req, res, next) => {
  let token = req.header('Authorization');
  if (!token) return res.status(403).send("Access Denied");

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trimLeft();
  }
  try {
    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.tokenData = decodeToken;
    req.tokenData._id = new mongoose.Types.ObjectId(req.tokenData._id);
    next()
  }
  catch(err){
    console.log(err);
    res.status(403).json({err:"Token is invalid or expired"})
  }
}

export default verifyToken;