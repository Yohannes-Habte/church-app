import express from "express";
import topAdmin from "../middleware/checkAdminRole.js";

const router = express.Router();

router.get("/");

export default router;