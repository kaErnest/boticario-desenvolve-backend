import { describe, expect, it, beforeAll, afterAll, afterEach, jest } from "@jest/globals";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Item from "../../models/Item.js";

describe("Testando o modelo Item", () => {
  let mongoServer;
  
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  const objetoItem = {
    id: "123",
    image: new mongoose.Types.ObjectId(),
    nome: "Item de Teste",
    descricao: "Descrição do item de teste",
    preco: 80,
  };

  it("Deve instanciar um novo item", () => {
    const item = new Item(objetoItem);
    expect(item).toEqual(expect.objectContaining(objetoItem));
  });

  it("Deve salvar item no BD", async () => {
    const item = new Item(objetoItem);
    const dados = await item.save();
    expect(dados.nome).toBe("Item de Teste");
  });

  it("Deve salvar no BD usando a sintaxe moderna", async () => {
    const item = new Item(objetoItem);
    const dados = await item.save();
    const retornado = await Item.findById(dados._id);
    expect(retornado).toEqual(expect.objectContaining({
      ...objetoItem,
      _id: expect.any(mongoose.Types.ObjectId),
    }));
  });

  it("Deve fazer uma chamada simulada ao BD", () => {
    const item = new Item(objetoItem);
    item.save = jest.fn().mockReturnValue({
      _id: new mongoose.Types.ObjectId(),
      ...objetoItem,
      createdAt: "2022-10-01",
      updatedAt: "2022-10-01",
    });

    const retorno = item.save();
    expect(retorno).toEqual(expect.objectContaining({
      _id: expect.any(mongoose.Types.ObjectId),
      ...objetoItem,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }));
  });

  it("Deve falhar se o campo 'nome' estiver ausente", async () => {
    const objetoInvalido = { ...objetoItem, nome: undefined };
    const item = new Item(objetoInvalido);
    try {
      await item.validate();
    } catch (erro) {
      expect(erro.errors.nome).toBeDefined();
    }
  });

  it("Deve falhar se o campo 'preco' estiver ausente", async () => {
    const objetoInvalido = { ...objetoItem, preco: undefined };
    const item = new Item(objetoInvalido);
    try {
      await item.validate();
    } catch (erro) {
      expect(erro.errors.preco).toBeDefined();
    }
  });
});

