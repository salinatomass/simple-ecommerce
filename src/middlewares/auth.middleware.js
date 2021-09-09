import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import createError from "http-errors";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return next(createError.BadRequest("token is required"));

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return next(createError.BadRequest("token must be a valid token"));
  }
};
