import jwt from "jsonwebtoken";
const generateAccessToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export default generateAccessToken;
