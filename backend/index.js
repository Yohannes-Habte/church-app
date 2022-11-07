import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import { check } from "express-validator";
// import jwt from "jsonwebtoken";

//import cookieParser from "cookie-parser";

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import registerRouter from "./routes/registerRoute.js";
import loginRouter from "./routes/loginRoute.js";
import usersRouter from "./routes/usersRoute.js";
import financesRouter from "./routes/financesRoute.js";
import sacramentsRouter from "./routes/sacramentsRoute.js";
import financeAdminRouter from "./routes/financeAdminRoute.js";
import sacramentAdminRouter from "./routes/sacramentAdminRoute.js";
import topAdminRouter from "./routes/topAdminRoute.js";


const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);
mongoose.connection.on("open", () => console.log("Database connection established"));
mongoose.connection.on("error", () => console.error);

app.use(morgan("tiny"));
// The endpoint for the following routes is:
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/finances", financesRouter);
app.use("/sacraments", sacramentsRouter); 
app.use("/financeAdmin", financeAdminRouter);
app.use("/sacramentAdmin", sacramentAdminRouter);
app.use("/TopAdmin", topAdminRouter);

// How to get image form the assets folder. // http://localhost:3001/Meal1_HummusBowl.jpg
app.use(express.static("assets"));

// Global error handler
app.use(globalErrorHandler);

app.listen(process.env.PORT || 5000, () => {
    console.log(`The server has started on part ${process.env.PORT || 5000}`)
});