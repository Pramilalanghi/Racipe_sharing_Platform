import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// 🛠 FIXED: Added a missing comma after the MongoDB connection string
mongoose.connect(
  "mongodb+srv://Pramilalanghi24:Pass123@avcoe.2ahkf.mongodb.net/recipeAppDB", // Add your database name here
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("DB connected..."))
.catch((err) => console.error("DB connection error:", err));


app.listen(3001, () => console.log("Server started"));
