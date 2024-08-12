import express from "express";
import PictureController from "../controllers/PictureController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/upload", upload.single("image"), PictureController.uploadImage);

export default router;
