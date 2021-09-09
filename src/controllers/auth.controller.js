import createError from "http-errors";

import { User } from "../models";
import { userSchema } from "../libs/schema.validator";
import { signAccessToken } from "../helpers/signAccessToken";

export const login = async (req, res, next) => {
  try {
    const reqValidation = await userSchema.validateAsync(req.body);
    const { email, password } = reqValidation;

    const userFound = await User.findOne({ email });
    if (!userFound)
      return next(createError.Unauthorized("The user does not exists"));

    const isMatch = await userFound.validPassword(password);
    if (!isMatch) return next(createError.Unauthorized("Invalid password"));

    const token = await signAccessToken(userFound.id);

    res.json({ token });
  } catch (err) {
    if (err.isJoi) return next(createError.BadRequest(err.message));
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const reqValidation = await userSchema.validateAsync(req.body);
    const { email, password } = reqValidation;

    const userFound = await User.findOne({ email });
    if (userFound) return next(createError.Unauthorized("User already exists"));

    const user = new User({ email, password });
    user.password = await user.generateHash(user.password);
    const userSaved = await user.save();

    const token = await signAccessToken(userSaved.id);

    res.json({ token });
  } catch (err) {
    if (err.isJoi) return next(createError.BadRequest(err.message));
    next(err);
  }
};

export const profile = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id }).select("-password"); // delete password

  if (!user) return next(createError.Unauthorized("User not found"));

  res.json(user);
};
