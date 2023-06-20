import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUser, getUserFriends, toggleFriend } from "../controllers/users.js";

const router = express.Router();

router.get("/:id", verifyToken as express.Handler, getUser);
router.get("/:id/friends", verifyToken as express.Handler, getUserFriends);

router.patch("/:id/:friendId", verifyToken as express.Handler, toggleFriend);

export default router;
