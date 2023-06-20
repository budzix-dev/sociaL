import jwt from "jsonwebtoken";
import { VerifiedRequestHandler } from "../types.js";
import { Types } from "mongoose";

export const verifyToken: VerifiedRequestHandler = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
      return;
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimStart();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: Types.ObjectId;
    };
    req.user = verified;

    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
