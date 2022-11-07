import User from "../models/usersModel.js";
import createError from "http-errors";
import jwt from "jsonwebtoken";

const topAdmin = async (req, res, next) => {
    // to check if the user is top admin, first you need to get the user's token and the current user's id


    let token;
    try {
        // Step 1: you need to get the token from the request headers (frontend)
        token = req.headers.authorization.split(" ")[1]; 

        if (!token) {
           throw new Error("User unauthorized");  
        }
        
        // Step 2: if you get a token from the step one, decode the token and verify it to prove the token is real and valid (backend) 
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);


        // Step 3: you need to get the user's id from the decoded token
        let currentUser;
        try {
            currentUser = await User.findById(decodedToken.id)
        } catch {
            return next(createError(500, "Couldn't query the database. Please try again"));
        }

        // Step 4: you need to check if the user is top admin
        if (currentUser && currentUser.isTopAdmin) {
            // Step 5: If the user is top admin, go on to the next middleware
            next();
        } else {
            throw new Error("User unauthorized");
        }
    } catch {
        next(createError(403, "User could not be authorized. Please try again"));
    }
};

export default topAdmin;