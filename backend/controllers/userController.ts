import { NextFunction, Request, Response } from "express";
import User_Model from "../models/userModel";
import * as mongoose from "mongoose";
import jwt from "jsonwebtoken";

const createToken = (id: any) => {
  if (!process.env.SECRET) {
    throw new Error("SECRET environment variable is not defined.");
  }

  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await (User_Model as any).login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    // catches error thrown in signup function in userModel.ts
    res.status(400).json({ error: error.message });
  }
};

//signup user
export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await (User_Model as any).signup(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    // catches error thrown in signup function in userModel.ts
    res.status(400).json({ error: error.message });
  }
};
