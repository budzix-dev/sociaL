import express from "express";
import multer from "multer";
import { login, register } from "../controllers/auth.js";

const createRouter = (upload: multer.Multer) => {
  const router = express.Router();

  router.post("/register", upload.single("picture"), register); // upload.single is a middleware that uploads the file under the key "picture"
  router.post("/login", login);

  return router;
};

export default createRouter;
