import { check } from "express-validator";

const financeValidators = () => {
    return [
        check("offer")
            .isNumeric()
            .withMessage("Offer must be a number"),
        check("donation")
            .isNumeric()
            .withMessage("Donation must be a number"),
        check("priestExpense")
            .isNumeric()
            .withMessage("Priest expense must be a number"),
        check("choirExpense")
            .isNumeric()
            .withMessage("Choir expense must be a number"),
        check("generalExpense")
            .isNumeric()
            .withMessage("General expense must be a number"),
        check("date")
            .isISO8601()
            .withMessage("Date must be a valid date"),
    ];
};

export default financeValidators;