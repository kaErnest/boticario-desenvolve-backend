import express from "express";
import cors from "cors";
import conectaNaDatabase from "./config/dbConnect.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import routes from "./routes/index.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
// Allow all origins
app.use(cors());
app.use(express.json());
routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);  

export default app;
