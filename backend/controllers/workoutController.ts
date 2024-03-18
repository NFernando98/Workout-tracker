import { NextFunction, Request, Response } from "express";
import Workout_Model from "../models/workoutModel";
import * as mongoose from "mongoose";

// get all workouts
export const getWorkouts = async (req: Request, res: Response) => {
  // user id is attached to req in middleware
  const user_id = req.user._id

  const workouts = await Workout_Model.find({user_id}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// get a single workout
export const getWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout_Model.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// create new workout
export const createWorkout = async (req: Request, res: Response) => {
  const { title, load, reps } = req.body;

  // TypeScript will correctly infer the type of emptyFields as an array of strings
  let emptyFields: string[] = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }

  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all all the fields", emptyFields });
  }

  // add doc to db
  try {
    const user = req.user._id; // Access the user ID extracted from the token
    const workout = await Workout_Model.create({
      title,
      load,
      reps,
      user_id: user,
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// delete a workout
export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout_Model.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};

// update a workout
export const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  // second param after { _id: id } is what to update
  const workout = await Workout_Model.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(workout);
};
