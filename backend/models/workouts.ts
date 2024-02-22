import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  reps: {
    type: Number,
    required: true,
  },
});
