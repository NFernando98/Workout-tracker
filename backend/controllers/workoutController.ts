import { NextFunction, Request, Response } from "express";
import Workout_Model from "../models/workoutModel";

// get all workouts
export const getWorkouts = async (req: Request, res: Response) => {
  const workouts = await Workout_Model.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

// get a single workout
export const getWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  const workout = await Workout_Model.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// create new workout
export const createWorkout = async (req: Request, res: Response) => {
  const { title, load, reps } = req.body;

  // add doc to db
  try {
    const workout = await Workout_Model.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// delete a workout

// update a workout
