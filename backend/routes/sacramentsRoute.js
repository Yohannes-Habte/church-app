import express from "express";
import { sacramentsGet, sacramentsPost } from "../controllers/sacramentsController.js";
import checkValidation from "../validators/checkValidation.js";
import requiredValues from "../validators/requiredValues.js";
import sacramentsValidators from "../validators/sacramentsValidators.js";

const router = express.Router();

router.post("/", requiredValues(["baptism", "firstCommunion", "confirmation", "covenant", "other", "sacramentDate"]), sacramentsValidators(), checkValidation, sacramentsPost);

router.get("/", sacramentsGet);

export default router;