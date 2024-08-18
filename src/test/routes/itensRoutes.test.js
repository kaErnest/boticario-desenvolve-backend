// import { afterEach, beforeEach, expect, describe, it, test } from "@jest/globals";
// import "dotenv/config";
// import app from "../../../src/app.js";
// import request from "supertest";
// import mongoose from "mongoose";

// let server;
// let idResposta;

// // Configuração do servidor antes de cada teste
// beforeEach(async () => {
//   server = app.listen(3000);
// });

// // Encerramento do servidor após cada teste
// afterEach(async () => {
//   server.close();
// });

// // Helper para criar um novo item
// const criarItem = async (dados) => {
//   const resposta = await request(app).post("/itens").send(dados);
//   return resposta.body._id;
// };

// describe("Testes em /itens", () => {
//   describe("GET em /itens", () => {
//     it("Deve retornar status 200 e ser um array", async () => {
//       const response = await request(app)
//         .get("/itens")
//         .set("Accept", "application/json")
//         .expect("Content-Type", /json/)
//         .expect(200);

//       expect(Array.isArray(response.body)).toBe(true);
//     });
//   });

//   describe("POST em /itens", () => {
//     it("Deve adicionar um novo item e retornar status 201", async () => {
//       const response = await request(app)
//         .post("/itens")
//         .send({
//           id: "123",
//           image: new mongoose.Types.ObjectId(),
//           nome: "Item de Teste",
//           descricao: "Descrição do item de teste",
//           preco: 80,
//         })
//         .expect("Content-Type", /json/)
//         .expect(201);

//       expect(response.body).toHaveProperty("_id");
//       expect(response.body.nome).toBe("Item de Teste");
//     });

//     it("Deve retornar status 400 ao tentar adicionar um item com dados inválidos", async () => {
//       await request(app)
//         .post("/itens")
//         .send({ nome: "" }) // Nome inválido
//         .expect(400);
//     });
//   });

//   describe("GET em /itens/:id", () => {
//     beforeEach(async () => {
//       idResposta = await criarItem({
//         id: "123",
//         image: new mongoose.Types.ObjectId(),
//         nome: "Item de Teste GET",
//         descricao: "Descrição do item de teste GET",
//         preco: 100,
//       });
//     });

//     it("Deve retornar status 404 ao buscar um ID inexistente", async () => {
//       const idInvalido = new mongoose.Types.ObjectId();
//       await request(app).get(`/itens/${idInvalido}`).expect(404);
//     });
//   });

//   describe("PUT em /itens/:id", () => {
//     beforeEach(async () => {
//       idResposta = await criarItem({
//         id: "123",
//         image: new mongoose.Types.ObjectId(),
//         nome: "Item de Teste PUT",
//         descricao: "Descrição do item de teste PUT",
//         preco: 100,
//       });
//     });

//     test.each([
//       ["image", { image: new mongoose.Types.ObjectId() }],
//       ["nome", { nome: "nome do item atualizado" }],
//       ["descricao", { descricao: "descricao do item atualizado" }],
//       ["preco", { preco: 150 }],
//     ])("Deve alterar o campo %s", async (chave, param) => {
//       const response = await request(app)
//         .put(`/itens/${idResposta}`)
//         .send(param)
//         .expect(200);

//       expect(response.body).toHaveProperty("message", "Item atualizado com sucesso");
//     });
//   });

//   describe("DELETE em /itens/:id", () => {
//     beforeEach(async () => {
//       idResposta = await criarItem({
//         id: "123",
//         image: new mongoose.Types.ObjectId(),
//         nome: "Item de Teste DELETE",
//         descricao: "Descrição do item de teste DELETE",
//         preco: 100,
//       });
//     });

//     it("Deve remover um item existente e retornar status 200", async () => {
//       await request(app).delete(`/itens/${idResposta}`).expect(200);
//     });

//     it("Deve retornar status 404 ao tentar remover um item com ID inexistente", async () => {
//       const idInvalido = new mongoose.Types.ObjectId();
//       const response = await request(app).delete(`/itens/${idInvalido}`).expect(404);
//       expect(response.body).toHaveProperty("mensagem", "Id do Item não localizado.");
//     });
//   });
// });
