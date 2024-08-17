import mongoose from "mongoose";
import { afterEach, beforeEach, expect, describe, it } from "@jest/globals";
import app from "../../../src/app.js";
import request from "supertest";

let server; 

beforeEach(async () => {
  const port = 3000;
  server = app.listen(port);
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  server.close();
});

describe("GET em /itens", () => {
  it("Deve retornar ok", async () => {
    const resposta = await request(app)
      .get("/itens")
      .set("Accept", "application/json")
      .expect("content-type", /json/)
      .expect(200);

    // expect(resposta.body).toEqual(true);
  });
});

// let idResposta;
// describe("POST em /itens", () => {
//   it("Deve adicionar um novo item", async () => {
//     const resposta = await request(app)
//       .post("/itens")
//       .send({
//         id: "123",
//         image: new mongoose.Types.ObjectId(),
//         nome: "Item de Teste",
//         descricao: "Descrição do item de teste",
//         preco: 80,
//       })
//       .expect(201);
      
//     idResposta = resposta.body.content.id;
//   });
//   it("Deve nao adicionar nada ao passar o body vazio", async () => {
//     await request(app)
//       .post("/itens")
//       .send({})
//       .expect(400);
//   });
// });

// describe("GET em /itens/id", () => {
//   it("Deve retornar recurso selecionado", async () => {
//     await request(app)
//       .get(`/itens/${idResposta}`)
//       .expect(200);
//   });
// });

// describe("PUT em /itens/id", () => {
//   test.each([
//     ["image", { image: new mongoose.Types.ObjectId() }],
//     ["nome", { nome: "nome do item" }],
//     ["descricao", { descricao: "descricao do item" }],
//     ["preco", { preco: 80 }],
//   ])("Deve alterar o campo %s", async (chave, param) => {
//     const requisicao = { request };
//     const spy = jest.spyOn(requisicao, "request");
//     await requisicao.request(app)
//       .put(`/itens/${idResposta}`)
//       .send(param)
//       .expect(204);

//     expect(spy).toHaveBeenCalled();
//   });
// });


// describe("DELETE em /itens/id", () => {
//   it("Deletar o recurso adcionado", async () => {
//     await request(app)
//       .delete(`/itens/${idResposta}`)
//       .expect(200);
//   });
// });