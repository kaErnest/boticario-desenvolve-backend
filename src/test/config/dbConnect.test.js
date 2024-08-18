// import dotenv from "dotenv";
// dotenv.config();
// import { describe, it, expect, afterAll, beforeAll } from "@jest/globals";
// import config from "../../config/dbConnect.js";
// import mongoose from "mongoose";

// describe("Testando configDB", () => {
//   beforeAll(async () => {
//     await config();
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   it("Teste de conexão com o banco de dados", async () => {
//     const itemMock = {
//       image: new mongoose.Types.ObjectId(),
//       nome: "Item de Teste",
//       descricao: "Descrição do item de teste",
//       preco: 80,
//     };

//     const itemSalvo = await mongoose.connection.collection("itens").insertOne(itemMock)
//       .then((retorno) => mongoose.connection.collection("itens").findOne({ _id: retorno.insertedId }));

//     expect(itemSalvo.nome).toBe(itemMock.nome);

//     await mongoose.connection.collection("itens").deleteOne({ _id: itemSalvo._id });
//   });
// });
