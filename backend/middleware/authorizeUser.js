import createError from "http-errors";
import jwt from "jsonwebtoken";

const authorizeUser = (req, res, next) => {
   
    let token;

    try {
        // Step one, you need to get the token from the request headers (frontend)
        token = req.headers.authorization.split(" ")[1];

        if (!token) {
           throw new Error("User unauthorized"); 
        }

        // Step two, if you get a token from the step one, decode the token and verify it to prove the token is valid or not (backend)
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

        console.log("Decoded token", decodedToken);

        // Step three, If the token is valid, go on to the next middleware
        next();
    } catch {
        next(createError(403, "User could not be authorized!"));
    }
}

export default authorizeUser;