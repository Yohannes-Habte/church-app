import User from "../models/usersModel.js";
import createError from "http-errors";
import jwt from "jsonwebtoken";


//=============================================================
// GET user by ID
// =============================================================
export const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    let foundUser;
    try{
        foundUser = await User.findById(userId);
        if (foundUser===null){
            return next(createError(500, "User with that ID could not be found. Please try again!"));
        } else {
            return res.status(200).json({
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                telephone: foundUser.telephone,
                street: foundUser.street,
                houseNo: foundUser.houseNo,
                zipCode: foundUser.zipCode,
                city: foundUser.city
            })
        }
    }catch{
        return next(createError(500, "User could not be queried. Please try again!"));
    }

}

//=============================================================
//  Verify Log in User in the Front End once logged in
// =============================================================

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.token;
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decode);

        if(decode) {
            let user = await User.findById(decode.id);
            res.send({success:true, data:user, token:token })
        }
    }catch(err){
        res.send({success:false, message:err.message})
    }
};