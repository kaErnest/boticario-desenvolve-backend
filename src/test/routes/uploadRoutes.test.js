import { afterEach, beforeEach, describe, it, expect } from "@jest/globals";
import "dotenv/config";
import app from "../../../src/app.js";
import request from "supertest";
import path from "path";

let server;
let port;

beforeEach(async () => {
  port = Math.floor(3000 + Math.random() * 1000);  // Usando uma porta aleatória
  server = app.listen(port);
});

afterEach(async () => {
  if (server) {
    await server.close(); // Fechar o servidor corretamente
  }
});

describe("GET em /picture", () => {
  it("Deve retornar status 200", async () => {
    const response = await request(server)
      .get("/picture")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(200);
  });

  it("Deve ser um array", async () => {
    const response = await request(server)
      .get("/picture")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);
  
    expect(Array.isArray(response.body.data)).toBe(true);

  });
});

describe("POST em /uploads", () => {
  it("Deve adicionar uma nova image e retornar status 201", async () => {
    const response = await request(server)
      .post("/uploads")
      .attach("image", path.resolve(__dirname, "uploads/image.jpg"))
      .expect("Content-Type", /json/)
      .expect(201);
  
    expect(response.body.data).toHaveProperty("_id"); // Verifica se a image criado tem um ID
    expect(response.body.data.filename).toBe("image.jpg"); // Verifica se o nome da image criado está correto
  });
  
  it("Deve retornar status 400 ao tentar adicionar uma image com dados inválidos", async () => {
    await request(server)
      .post("/uploads")
      .send({
        filename: "", // Nome inválido
        path: "",
        originalname: "",
      })
      .expect(400);
  });
});
//////////////
// describe("GET em /kits/:id", () => {


//   beforeEach(async () => {
//     // Criar um kits antes de testar o GET /kits/:id
//     const resposta = await request(app)
//       .post("/kits")
//       .send({
//         id: "123",
//         image: new mongoose.Types.ObjectId(),
//         titulo: "kit de Teste GET",
//         item: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
//         preco: 100,
//       });
  
//     idResposta = resposta.body._id; // Armazenar o ID do kit criado
//   });
  
//   it("Deve retornar status 404 ao buscar um ID inexistente", async () => {
//     const idInvalido = new mongoose.Types.ObjectId(); // Gera um ID válido, mas inexistente
  
//     const response = await request(app)
//       .get(`/kits/${idInvalido}`)
//       .expect(404);
  
//     expect(404);
//   });
// });

// describe("PUT em /kits/:id", () => {
  
//   beforeEach(async () => {
//     // Criar um kit antes de testar o PUT /itens/:id
//     const resposta = await request(app)
//       .post("/kits")
//       .send({
//         id: "123",
//         image: new mongoose.Types.ObjectId(),
//         titulo: "kit de Teste GET",
//         item: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
//         preco: 100,
//       });
  
//     idResposta = resposta.body._id; // Armazenar o ID do kit criado
//   });
  
//   test.each([
//     ["image", { image: new mongoose.Types.ObjectId() }],
//     ["titulo", { nome: "nome do kit atualizado" }],
//     ["item", { item: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()] }],
//     ["preco", { preco: 150 }],
//   ])("Deve alterar o campo %s", async (chave, param) => {
//     const response = await request(app)
//       .put(`/kits/${idResposta}`)
//       .send(param)
//       .expect(200);
  
//     expect(response.body).toHaveProperty("message", "kit atualizado com sucesso");
//   });
// });

// describe("DELETE em /kits/:id", () => {
//   let idResposta;
  
//   beforeEach(async () => {
//     // Criar um kit antes de testar o PUT /itens/:id
//     const resposta = await request(app)
//       .post("/kits")
//       .send({
//         id: "123",
//         image: new mongoose.Types.ObjectId(),
//         titulo: "kit de Teste GET",
//         item: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
//         preco: 100,
//       });
  
//     idResposta = resposta.body._id; // Armazenar o ID do kit criado
//   });
  
//   it("Deve remover um kit existente e retornar status 200", async () => {
//     const response = await request(app)
//       .delete(`/kits/${idResposta}`)
//       .expect(200);
  
//     expect(200);
  
//   });
  
//   it("Deve retornar status 404 ao tentar remover um kit com ID inexistente", async () => {
//     const idInvalido = new mongoose.Types.ObjectId(); // Gera um ID válido, mas inexistente
  
//     const response = await request(app)
//       .delete(`/kits/${idInvalido}`)
//       .expect(404);
  
//     expect(response.body).toHaveProperty("mensagem", "Id do kit não localizado.");
//   });
// });
