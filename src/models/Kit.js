import mongoose from "mongoose";

const kitSchema = new mongoose.Schema(
  {
    id: { type: String },
    imagem: { type: mongoose.Schema.Types.ObjectId, ref: "Picture", required: [true, "A imagem é obrigatória"] },
    titulo: { type: String, required: [true, "O título é obrigatório"] },
    item: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "itens" }],
      validate: {
        validator: function(v) {
          return v && v.length >= 2;
        },
        message: "Pelo menos 2 itens são obrigatórios"
      },
      required: [true, "O item é obrigatório"]
    },
    preco: { type: Number, required: [true, "O preço é obrigatório"] },
  },
  { versionKey: false } // Remove o campo __v
);

const kits = mongoose.model("kits", kitSchema);

export default kits;
