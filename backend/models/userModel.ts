import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

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
    type: String,
    required: true,
  },
});

// static signup method (could put this logic in controller file as well)
// uses non-arrow function to reference the model itself with "this" key word
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });
  // later we'll catch the error when we use the signup function
  if (exists) {
    throw Error("Email already in use");
  }

  // salt makes extra hashed characters to password before hashing fully..extra layer
  const salt = await bcrypt.genSalt(10);
  // now hash
  const hash = await bcrypt.hash(password, salt);

  // now store passowrd in database alongside user's email
  const user = await this.create({ email, password: hash });

  return user;
};

// static method for login logic
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  // later we'll catch the error when we use the signup function
  if (!user) {
    throw Error("Invalid email");
  }

  // checking if password exists/matches.. compare(password, hashed-password)
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid password");
  }

  return user;
};

// Creates a model
export default mongoose.model("User", userSchema);
