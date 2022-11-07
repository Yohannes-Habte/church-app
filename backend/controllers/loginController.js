import User from "../models/usersModel.js";
import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginPost = async (req, res, next) => {
  const { email, password } = req.body;

  let foundUser;
  try {
    foundUser = await User.findOne({ email: email });
  } catch {
    return next(createError(500, "Server error. Please try again."));
  }

  // If user is not found, return error
  if (!foundUser)
    return next(createError(404, "Invalid Username. Please try again."));

  if (foundUser) {
    // If password is incorrect, return error
    let isPasswordCorrect;
    try {
      // Compare the password entered in the frontend with the hashed password in the database
      isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    } catch {
      return next(createError(500, "Server error. Please try again."));
    }

    // If password is incorrect, return error
    if (!isPasswordCorrect)
      return next(createError(401, "Password is incorrect. Please try again."));

    // Generate a token for the user that is valid for 1 hour.
    let newToken;
    try {
      newToken = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
    } catch {
      return next(createError(500, "could not generate token. Please try again!"));
    }
    // If the password is correct and the token is valid, return the user id and the user's token
    return res.json({
      id: foundUser._id,
      token: newToken,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
    });
  } else {
    return next(createError(400, "User does not exist."));
  }
};
