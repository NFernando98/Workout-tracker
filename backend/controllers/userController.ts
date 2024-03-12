import { NextFunction, Request, Response } from "express";
import User_Model from "../models/userModel";
import * as mongoose from "mongoose";

// login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    res.json({ mssg: "login user" });
  } catch (error) {
    res.status(400).json({error})
  }
    
};

//signup user
export const signupUser = async (req: Request, res: Response) => {
  res.json({ mssg: "signup user" });
};
