import express from "express";
const router = express.Router();
import Workout_Model from "../models/workoutModel";

// GET all workouts
router.get("/", (req, res) => {
  res.json({ mssg: "GET all workouts" });
});

// GET single workout
router.get("/:id", (req, res) => {
  res.json({ mssg: "GET single workout" });
});

// POST new workout
router.post("/", async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    // Creates a document given the 3 properties
    const workout = await Workout_Model.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// DELETE a workout
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE all workouts" });
});

// UPDATE a workout
router.patch("/:id", (req, res) => {
  res.json({ mssg: "PATCH all workouts" });
});

export default router;
