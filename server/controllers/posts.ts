import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost: express.Handler = async (req, res) => {
  try {
    const { creatorId, description, picturePath } = req.body;
    const creator = await User.findById(creatorId);
    const newPost = new Post({
      creatorId,
      creatorDisplayName: creator!.displayName,
      location: creator!.location,
      description,
      creatorPicturePath: creator!.picturePath,
      picturePath,
      likedBy: [],
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err: any) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts: express.Handler = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts: express.Handler = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost: express.Handler = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const currentUserIndex = post!.likedBy!.indexOf(userId);

    if (currentUserIndex > -1) {
      post!.likedBy!.splice(currentUserIndex, 1);
    } else {
      post!.likedBy!.push(userId);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likedBy: post!.likedBy },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
