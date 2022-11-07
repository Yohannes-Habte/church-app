import Sacrament from "../models/sacramentModel.js";
import createError from "http-errors";

//=======================================================
// Post new sacrament report
//=======================================================
export const sacramentsPost = async (req, res, next) => {
    const { baptism, firstCommunion, confirmation, covenant, other, sacramentDate } = req.body;

    let existingSacramentReport;

    try{
        existingSacramentReport = await Sacrament.findOne({ sacramentDate: sacramentDate });
    }catch(error){
        console.log(error);
        return next(createError(500, "Server error. Please try again."));
    }

    // If sacrament is found, return error
    if(existingSacramentReport) return next(createError(400, "Sacrament report already exists. Please try again."));

    // If sacrament is not found, create new sacrament
    if(!existingSacramentReport){
        const newSacramentReport = new Sacrament({
            baptism: baptism,
            firstCommunion: firstCommunion,
            confirmation: confirmation,
            covenant: covenant,
            other: other,
            sacramentDate: sacramentDate,
        });

        try{
            await newSacramentReport.save();
        } catch (err){
            console.log(err);
            return next(createError(500, "Server error. Please try again."));
        }

        res.status(201).json({sacraments: newSacramentReport});
    };
};

//===========================================================
// Get all sacraments reports
//===========================================================
export const sacramentsGet = async (req, res, next) => {
    let sacramentsReport;

    try{
        sacramentsReport = await Sacrament.find();
    }catch(error){
        console.log(error);
        return next(createError(500, "Server error. Please try again."));
    }

    res.status(200).json({sacraments: sacramentsReport});
};