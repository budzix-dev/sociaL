import { Express } from "express";
import { Multer } from "multer";
import createAuthRoutes from "./auth.js";
import userRoutes from "./users.js";
import createPostRoutes from "./posts.js";

const setupRoutes = (app: Express, upload: Multer) => {
  app.use("/auth", createAuthRoutes(upload));
  app.use("/users", userRoutes);
  app.use("/posts", createPostRoutes(upload));
};

export default setupRoutes;
