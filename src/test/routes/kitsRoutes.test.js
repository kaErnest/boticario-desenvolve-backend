import { afterEach, beforeAll, afterAll, beforeEach, describe, it, expect, test } from "@jest/globals";
import "dotenv/config";
import app from "../../../src/app.js";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let server;
let mongoServer;
let idResposta;
let port;

beforeAll(async () => {
  // Configura o MongoMemoryServer
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
  // Usando uma porta aleatória
  port = Math.floor(3000 + Math.random() * 1000);
  server = app.listen(port);
});

afterEach(async () => {
  // Limpa o banco de dados após cada teste
  await mongoose.connection.dropDatabase();
  
  // Fecha o servidor corretamente
  if (server) {
    await server.close();
  }
});

afterAll(async () => {
  // Desconecta o MongoDB e para o MongoMemoryServer
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("GET em /kits", () => {
  it("Deve retornar status 200", async () => {
    const response = await request(server)
      .get("/kits")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(response.status).toBe(200);
  });

  it("Deve ser um array", async () => {
    const response = await request(server)
      .get("/kits")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/);

    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST em /kits", () => {
  it("Deve adicionar um novo kit e retornar status 201", async () => {
    const response = await request(app)
      .post("/kits")
      .send({
        id: "123",
        image: new mongoose.Types.ObjectId(),
        titulo: "titulo de Teste",
        item: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
        preco: 80,
      })
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty("_id");
    expect(response.body.titulo).toBe("titulo de Teste");
  });

  it("Deve retornar status 400 ao tentar adicionar um kit com dados inválidos", async () => {
    await request(app)
      .post("/kits")
      .send({
        titulo: "", // Nome inválido
        item: [new mongoose.Types.ObjectId()], // Menos de 2 itens
        preco: 80,
      })
      .expect(400);
  });
});

describe("GET em /kits/:id", () => {
  beforeEach(async () => {
    idResposta = await request(app)
      .post("/kits")
      .send({
        id: "123",
        image: new mongoose.Types.ObjectId(),
        titulo: "kit de Teste GET",
        item: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
        preco: 100,
      })
      .then(res => res.body._id);
  });

  it("Deve retornar status 404 ao buscar um ID inexistente", async () => {
    const idInvalido = new mongoose.Types.ObjectId();

    await request(app)
      .get(`/kits/${idInvalido}`)
      .expect(404);
  });
});

describe("PUT em /kits/:id", () => {
  beforeEach(async () => {
    idResposta = await request(app)
      .post("/kits")
      .send({
        id: "123",
        image: new mongoose.Types.ObjectId(),
        titulo: "kit de Teste PUT",
        item: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
        preco: 100,
      })
      .then(res => res.body._id);
  });

  test.each([
    ["image", { image: new mongoose.Types.ObjectId() }],
    ["titulo", { titulo: "titulo do kit atualizado" }],
    ["item", { item: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()] }],
    ["preco", { preco: 150 }],
  ])("Deve alterar o campo %s", async (chave, param) => {
    const response = await request(app)
      .put(`/kits/${idResposta}`)
      .send(param)
      .expect(200);

    expect(response.body).toHaveProperty("message", "kit atualizado com sucesso");
  });
});

describe("DELETE em /kits/:id", () => {
  beforeEach(async () => {
    idResposta = await request(app)
      .post("/kits")
      .send({
        id: "123",
        image: new mongoose.Types.ObjectId(),
        titulo: "kit de Teste DELETE",
        item: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
        preco: 100,
      })
      .then(res => res.body._id);
  });

  it("Deve remover um kit existente e retornar status 200", async () => {
    await request(app)
      .delete(`/kits/${idResposta}`)
      .expect(200);
  });

  it("Deve retornar status 404 ao tentar remover um kit com ID inexistente", async () => {
    const idInvalido = new mongoose.Types.ObjectId();

    const response = await request(app)
      .delete(`/kits/${idInvalido}`)
      .expect(404);

    expect(response.body).toHaveProperty("mensagem", "Id do kit não localizado.");
  });
});

