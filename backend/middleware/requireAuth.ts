import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User_Model from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Define the type of user property here
    }
  }
}

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // verify authentication
  // headers are the 'content-type', applciation: JSON... those ones. One of those headers is the auth property
  // i.e., 'Bearer dfdf32423423jhbjhsdfsdfsdf.sdf'
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // split the 'Bearer dfdf32423423jhbjhsdfsdfsdf.sdf' and take dfdf32423423jhbjhsdfsdfsdf.sdf
  const token = authorization.split(" ")[1];

  // Check if SECRET environment variable is set
  if (!process.env.SECRET) {
    throw new Error("SECRET environment variable is not set");
  }

  // verify token
  try {
    const { id } = jwt.verify(token, process.env.SECRET) as { id: string };

    const user = await User_Model.findById(id);

    if (!user) {
      console.error(`User not found for ID: ${id}`);
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user._id;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

export default requireAuth;
