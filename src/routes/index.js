import express from "express";
import kits from "./kitsRoutes.js";
import itens from "./itensRoutes.js";
import uploadRoutes from "./uploadRoutes.js"; 

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send ({titulo: "Loja de Cosméticos Solamigo."});
  }); 

  app.use(
    express.json(),
    kits, 
    itens,
    uploadRoutes
  );
};

export default routes;