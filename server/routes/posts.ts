import express from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const createPostRoutes = (upload: any) => {
  const router = express.Router();

  /* READ */
  router.get("/", verifyToken as express.Handler, getFeedPosts);
  router.get("/:userId/posts", verifyToken as express.Handler, getUserPosts);

  /* UPDATE */
  router.post(
    "/create",
    verifyToken as express.Handler,
    upload.single("picture"),
    createPost
  );
  router.patch("/:id/like", verifyToken as express.Handler, likePost);

  return router;
};

export default createPostRoutes;
