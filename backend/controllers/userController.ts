import { NextFunction, Request, Response } from "express";
import User_Model from "../models/userModel";
import * as mongoose from "mongoose";

// login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    res.json({ mssg: "login user" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//signup user
export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await (User_Model as any).signup(email, password);
    res.status(200).json({ email, user });
  } catch (error: any) {
    // catches error thrown in signup function in userModel.ts
    res.status(400).json({ error: error.message });
  }
};
