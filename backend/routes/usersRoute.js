import express from "express";
import { getUserById, verifyToken } from "../controllers/usersController.js";

const router = express.Router();

router.get("/:id", getUserById) 

router.post("/verifyToken", verifyToken);


export default router;