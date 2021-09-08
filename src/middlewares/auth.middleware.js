import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).send({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }
};
