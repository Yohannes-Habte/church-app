import User from "../models/usersModel.js";
import createError from "http-errors";
import jwt from "jsonwebtoken";

export const registerPost = async (req, res, next) => {
  const {firstName, lastName, telephone, gender, email, password, street, houseNumber, zipCode, city, province, country,
  } = req.body;

  let foundUser;

  try {
    foundUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
    return next(createError(500, "Server error. Please try again."));
  }

  // If user is found, return error
  if (foundUser)
    return next(createError(400, "User already exists. Please try again."));

  // If user is not found, create new user
  if (!foundUser) {
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      telephone: telephone,
      gender: gender,
      email: email,
      password: password,
      street: street,
      houseNumber: houseNumber,
      zipCode: zipCode,
      city: city,
      province: province,
      country: country,
      sacramentAdmin: false,
      financeAdmin: false,
      topAdmin: false,
      sacraments: [],
      finances: [],
    });

    try {
      await newUser.save();
    } catch (err) {
      console.log(err);
      return next(createError(500, "Server error. Please try again."));
    }

    // Create a token that is valid for one hour for the new registered user
    let newToken;
    try {
      newToken = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
    } catch {
      return next(
        createError(500, "could not generate token. please try again!")
      );
    }
    // Return the new user's id and the new token
    return res.json({ id: newUser._id, token: newToken });
  }
};
