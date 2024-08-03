import express from "express";
import KitController from "../controllers/kitsController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/kits", KitController.listarKits, paginar)
  .get("/kits/busca", KitController.listarKitPorFiltro, paginar)
  .get("/kits/:id", KitController.listarKitPorId)
  .post("/kits", KitController.cadastrarKit)
  .put("/kits/:id", KitController.atualizarKit)
  .delete("/kits/:id", KitController.excluirKit);


export default router;