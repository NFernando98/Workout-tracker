import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    selectedWeight: {
      type: String,
      required: false,
    },
    load: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      require: false,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Creates a model
export default mongoose.model("Workout", workoutSchema);
