import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import crypto from "crypto";

const generateRefreshToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

const hashedToken = crypto
  .createHash("sha256")
  .update(token)
  .digest("hex");

   await User.findByIdAndUpdate(userId, { refreshToken: hashedToken }).exec();

  return token;
};

export default generateRefreshToken;
