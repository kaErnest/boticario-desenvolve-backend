import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  id: { type: String},
  imagem: { type: mongoose.Schema.Types.ObjectId, ref: "Picture", required: [true, "A imagem é obrigatória"] },
  nome: { type: String, required: [true, "O nome do Itém é obrigatório"] },
  descricao: { type: String, required: [true, "A descrição é obrigatória"] },
  preco: { type: Number, required: [true, "O preço é obrigatório"] },
}, { versionKey: false });

const itens = mongoose.model("itens", itemSchema);

export default itens;
