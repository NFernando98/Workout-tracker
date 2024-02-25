import express from "express";
const router = express.Router();

import {
  createWorkout,
  getWorkouts,
  getWorkout,
} from "../controllers/workoutController";

import Workout_Model from "../models/workoutModel";

// GET all workouts
router.get("/", getWorkouts);

// GET single workout
router.get("/:id", getWorkout);

// POST new workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE all workouts" });
});

// UPDATE a workout
router.patch("/:id", (req, res) => {
  res.json({ mssg: "PATCH all workouts" });
});

export default router;
