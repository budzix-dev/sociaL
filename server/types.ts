import { Types } from "mongoose";
import { Request, Response, NextFunction } from "express";

export interface VerifiedRequest extends Request {
  user: {
    _id: Types.ObjectId;
  };
}

export type VerifiedRequestHandler = (
  req: VerifiedRequest,
  res: Response,
  next: NextFunction
) => Promise<void> | void;
