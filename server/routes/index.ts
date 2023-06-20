import { Express } from "express";
import { Multer } from "multer";
import createAuthRoutes from "./auth.js";
import userRoutes from "./users.js";

const setupRoutes = (app: Express, upload: Multer) => {
  app.use("/auth", createAuthRoutes(upload));
  app.use("/users", userRoutes);
};

export default setupRoutes;
