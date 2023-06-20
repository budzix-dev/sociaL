import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import express from "express";

export const register: express.Handler = async (req, res) => {
  try {
    const {
      email,
      password,
      displayName,
      picturePath,
      location,
      occupation,
      bio,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      displayName,
      picturePath,
      location,
      occupation,
      bio,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login: express.Handler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "User with this email does not exist." });
      return;
    }

    const passwordsIsCorrect = await bcrypt.compare(password, user.password);
    if (!passwordsIsCorrect) {
      res.status(400).json({ msg: "Invalid credentials." });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
    res.status(200).json({ token, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
