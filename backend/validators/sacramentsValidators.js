import { check } from "express-validator";

const sacramentsValidators = () => {
    return [
        check("baptism")
            .isLength({ min: 2 })
            .withMessage("Baptism must be at least 20 characters long"),
        check("firstCommunion")
            .isLength({ min: 2 })
            .withMessage("First Communion must be at least 20 characters long"),
        check("confirmation")
            .isLength({ min: 2 })
            .withMessage("Confirmation must be at least 20 characters long"),
        check("covenant")
            .isLength({ min: 2 })
            .withMessage("Covenant must be at least 20 characters long"),
        check("other")
            .isLength({ min: 2 })
            .withMessage("Other must be at least 20 characters long"),
        check("sacramentDate")
            .isISO8601()
            .withMessage("Date must be a valid date"),
    ];
};

export default sacramentsValidators;