import * as dotenv from "dotenv";
import express from "express";
import * as mongoose from "mongoose";

import workoutRoutes from "./routers/workouts";

dotenv.config();

const app = express();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to DB
mongoose
  .connect(process.env.MONG_URI ?? "default_connection_string")
  .then(() => {
    // listen for requests
    app.listen(port, () => {
      console.log(`Connected to database and service listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
