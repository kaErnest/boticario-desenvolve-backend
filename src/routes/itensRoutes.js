import express from "express";
import ItemController from "../controllers/itensController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
  .get("/itens", ItemController.listarItens, paginar)
  .get("/itens/busca", ItemController.listarItemPorFiltro, paginar)
  .get("/itens/:id", ItemController.listarItemPorId)
  .post("/itens", ItemController.cadastrarItem)
  .put("/itens/:id", ItemController.atualizarItem)
  .delete("/itens/:id", ItemController.excluirItem);


export default router;