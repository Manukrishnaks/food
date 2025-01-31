// routes/foodRoute.js
import express from "express";
import multer from "multer";
import { addFood, listFood,removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router(); // Changed to Router

// Image storage engine
const storage = multer.diskStorage({
  destination: "uploads",
  limits: { fileSize: 1024 * 1024 * 5 },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Fixed template literal
  }
});

const upload = multer({ storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood);

export default foodRouter;
