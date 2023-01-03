import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
// Step 3 for deployment
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// to receive and download images 
import multer from "multer"; // to receive and download images

const storage = multer.diskStorage({ // where to store the images
    destination: "uploads/images/",
    filename: function(req,file, cb) {
        cb(null, new Date().getTime() + file.originalname)
    }
})
const upload = multer({storage});
// Routes router 
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import registerRouter from "./routes/registerRoute.js";
import loginRouter from "./routes/loginRoute.js";
import mealRouter from "./routes/mealRoute.js";
import orderRouter from "./routes/ordersRoute.js";
import usersRouter from "./routes/usersRoute.js"
import paymentRouter from "./routes/paymentRoute.js";
import adminRouter from "./routes/adminRoute.js";
import landingPageRouter from "./routes/landingPageRoute.js";
import shoesRouter from "./routes/shoesRoute.js";
import commentsRouter from "./routes/commentsRoute.js"

const app = express();
app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

dotenv.config(); 

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`)
//mongoose.connect(`mongodb+srv://:@/?retryWrites=true&w=majority`)
mongoose.connection.on("open", () => console.log("Database connection established"));
mongoose.connection.on("error", () => console.error);

app.use(morgan("tiny"));
app.use("/register", registerRouter); 
app.use("/login", loginRouter);
app.use("/meals", mealRouter);
app.use("/orders", orderRouter);
app.use("/shoes", shoesRouter);
app.use("/users", usersRouter);
app.use("/payment", paymentRouter);
app.use("/admin", adminRouter);
app.use("/landingPage", landingPageRouter);
app.use("/comments", upload.single("image"), commentsRouter)

// http://localhost:3001/Meal1_HummusBowl.jpg
app.use(express.static("assetMeals"));
app.use(express.static("assetShoes"));
app.use(express.static("uploads"));

// Global error handler
app.use(globalErrorHandler);

// Step 2 for deployment
app.listen(process.env.PORT || 3001, () => {
    console.log(`The server has started on part ${process.env.PORT || 3001}`)
});

// Serve frontend client/build folder // Step 1 for deployment
app.use(express.static(path.join(__dirname, "front-end/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/front-end/build/index.html"));
});

// Step 4 for deployment => paste the heroku-postbuild in package.json under scripts
// "heroku-postbuild": "cd front-end && npm install && npm run build" 