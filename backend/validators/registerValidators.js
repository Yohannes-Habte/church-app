import { check } from "express-validator";

const registerValidators = () => {
    return [
        check("firstName")
            .trim().escape().isLength({ min: 2, max: 15 })
            .withMessage("First name must be between 2 and 15 characters"),
        check("lastName")
            .trim().escape().isLength({ min: 2, max: 15 })
            .withMessage("Last name must be between 2 and 20 characters"),
        check("telephone")
            .trim().escape().isInt()
            .withMessage("Telephone must be a number"),
        check("email")
            .normalizeEmail().isEmail()
            .withMessage("Email must be a valid email"),
        check("password")
            .isStrongPassword()
            .withMessage("Password must be at least 8 characters long and contain at least one number and one uppercase letter"),
        check("street")
            .trim().escape().isLength({ min: 2, max: 30 })
            .withMessage("Street must be between 2 and 30 characters"),
        check("houseNumber")
            .trim().escape().isInt()
            .withMessage("House number must be a number"),
        check("zipCode")
            .isInt()
            .withMessage("Zip code must be a number"),
        check("city")
            .trim().escape().isLength({ min: 2, max: 30 })
            .withMessage("City must be between 2 and 30 characters"),
        check("province")
            .trim().escape().isLength({ min: 2, max: 30 })
            .withMessage("Province must be between 2 and 30 characters"),
        check("country")
            .trim().escape().isLength({ min: 2, max: 30 })
            .withMessage("Country must be between 2 and 30 characters")
    ];
};

export default registerValidators;