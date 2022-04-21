//import cors from "cors";
import express from "express";
const app = express();
import env from "dotenv";
env.config();
import "express-async-errors";
import morgan from "morgan";
// Database and authentication of user
import connectDB from "./db/connect.js";

//routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

//Middleware
doesNotExistMiddleware;
import doesNotExistMiddleware from "./middleware/doesNotExist.js";
import handleErrorMiddleware from "./middleware/handleError.js";
import authenticateUser from './middleware/auth.js'

//app.use(cors());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/api/v1", (req, res) => {
  // throw new Error('error')
  res.json({ msg: "API" });
});

app.get("/", (req, res) => {
  // throw new Error('error')
  res.json({ msg: "Welcome!" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs",authenticateUser, jobsRouter);

app.use(doesNotExistMiddleware);
app.use(handleErrorMiddleware);

const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
