import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

// defining a structure for the documents when we save it to the database
// mongoose wont allow to save documents to database unless adhering to this structure
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: Number,
    required: true,
  },
});

// Creates a model
export default mongoose.model("User", userSchema);
