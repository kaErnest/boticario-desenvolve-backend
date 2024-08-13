import express from "express";
import PictureController from "../controllers/PictureController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router
  .post("/upload", upload.single("image"), PictureController.uploadImage)
  .get("/picture", PictureController.getAllImages)
  .get("/picture/:id", PictureController.getImageById)
  .put("/picture/:id", PictureController.updateImage)
  .delete("/picture/:id", PictureController.deleteImage);


export default router;
