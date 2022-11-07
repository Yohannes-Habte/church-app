import express from "express";
import { registerPost } from "../controllers/registerController.js";
import checkValidation from "../validators/checkValidation.js";
import registerValidators from "../validators/registerValidators.js";
import requiredValues from "../validators/requiredValues.js";

const router = express.Router();

router.post("/", requiredValues(["firstName", "lastName", "telephone", "gender", "email", "password", "street", "houseNumber", "zipCode", "city", "province", "country"]), registerValidators(), checkValidation, registerPost);

export default router;