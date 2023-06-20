import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer"; // used for local file storage
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import setupRoutes from "./routes/index.js";

const run = async () => {
  // CONFIG + MIDDLEWARE
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("common"));
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(bodyParser.json({ limit: "30mb" }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
  app.use(cors());
  app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // assets stored in public/assets

  // FILE STORAGE
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/assets"); // destination folder is our assets folder
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // stores the file under the original filename
    },
  });
  const upload = multer({ storage });

  setupRoutes(app, upload);

  try {
    const PORT = process.env.PORT || 5000;
    await mongoose.connect(process.env.MONGO_URL!);
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

run();
