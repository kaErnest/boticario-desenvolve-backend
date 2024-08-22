import { describe, it, expect, afterAll, beforeAll } from "@jest/globals";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";


let mongoServer;

describe("Testando configDB", () => {
  beforeAll(async () => {
    // Configura o MongoMemoryServer
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Configura a conexão com o MongoDB
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    // Desconecta o MongoDB e para o MongoMemoryServer
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("Teste de conexão com o banco de dados", async () => {
    const itemMock = {
      image: new mongoose.Types.ObjectId(),
      nome: "Item de Teste",
      descricao: "Descrição do item de teste",
      preco: 80,
    };

    const itemSalvo = await mongoose.connection.collection("itens").insertOne(itemMock)
      .then((retorno) => mongoose.connection.collection("itens").findOne({ _id: retorno.insertedId }));

    expect(itemSalvo.nome).toBe(itemMock.nome);

    await mongoose.connection.collection("itens").deleteOne({ _id: itemSalvo._id });
  });
});
