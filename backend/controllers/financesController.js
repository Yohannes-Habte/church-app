import Finance from "../models/financeModel.js";
import createError from "http-errors";


//=======================================================
// Post new finance report
//=======================================================

export const financesPost = async (req, res, next) => {

    const { offer, donation, priestExpense, choirExpense, generalExpense, date } = req.body;

   let existingFinanceReport;

   try{
         existingFinanceReport = await Finance.findOne({ date: date });
   }catch(error){
       console.log(error);
       return next(createError(500, "Server error. Please try again."));
   }

   // If finance report is found, return error
   if(existingFinanceReport) return next(createError(400, "Finance report already exists. Please try again."));

    // If finance report is not found, create new finance report
    if(!existingFinanceReport){
        const newFinanceReport = new Finance({
            offer: offer,
            donation: donation,
            priestExpense: priestExpense,
            choirExpense: choirExpense,
            generalExpense: generalExpense,
            date: date,
            total: Number(offer) + Number(donation) + Number(priestExpense) + Number(choirExpense) + Number(generalExpense)
        });

        try{
            await newFinanceReport.save();
        } catch (err){
            console.log(err);
            return next(createError(500, "Server error. Please try again."));
        }

        res.status(201).json({finances: newFinanceReport});
    };
};


//===========================================================
// Get all finances reports
//===========================================================
export const financesGet = async (req, res, next) => {
    let financesReport;

    try{
        financesReport = await Finance.find();
    }catch(error){
        console.log(error);
        return next(createError(500, "Server error. Please try again."));
    }

    res.status(200).json({finances: financesReport});
};
