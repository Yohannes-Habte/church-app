import express from "express";
import { financesGet, financesPost } from "../controllers/financesController.js";
import checkValidation from "../validators/checkValidation.js";
import financeValidators from "../validators/financeValidators.js";
import requiredValues from "../validators/requiredValues.js";

const router = express.Router();

router.post("/", requiredValues(["offer", "donation", "priestExpense", "choirExpense", "generalExpense", "date"]),  financeValidators(), checkValidation, financesPost);

router.get("/", financesGet);

export default router;