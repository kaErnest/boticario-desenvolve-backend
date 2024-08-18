import { describe, expect, it, beforeAll, afterAll, afterEach, jest } from "@jest/globals";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Kit from "../../models/Kit.js";

describe("Testando o modelo Kit", () => {
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

  const objetoKit = {
    id: "123",
    image: new mongoose.Types.ObjectId(),
    titulo: "Kit de Teste",
    item: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    preco: 80,
  };

  it("Deve instanciar um novo kit", () => {
    const kit = new Kit(objetoKit);
    expect(kit).toEqual(expect.objectContaining(objetoKit));
    expect(kit.item.length).toBeGreaterThanOrEqual(2);
  });

  it("Deve salvar kit no BD", async () => {
    const kit = new Kit(objetoKit);
    const dados = await kit.save();
    expect(dados.titulo).toBe("Kit de Teste");
  });

  it("Deve salvar no BD usando a sintaxe moderna", async () => {
    const kit = new Kit(objetoKit);
    const dados = await kit.save();
    const retornado = await Kit.findById(dados._id);
    expect(retornado).toEqual(expect.objectContaining({
      ...objetoKit,
      _id: expect.any(mongoose.Types.ObjectId),
    }));
  });

  it("Deve fazer uma chamada simulada ao BD", () => {
    const kit = new Kit(objetoKit);
    kit.save = jest.fn().mockReturnValue({
      _id: new mongoose.Types.ObjectId(),
      ...objetoKit,
      createdAt: "2022-10-01",
      updatedAt: "2022-10-01",
    });

    const retorno = kit.save();
    expect(retorno).toEqual(expect.objectContaining({
      _id: expect.any(mongoose.Types.ObjectId),
      ...objetoKit,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }));
  });

  it("Deve falhar se o campo 'titulo' estiver ausente", async () => {
    const objetoInvalido = { ...objetoKit, titulo: undefined };
    const kit = new Kit(objetoInvalido);
    try {
      await kit.validate();
    } catch (erro) {
      expect(erro.errors.titulo).toBeDefined();
    }
  });

  it("Deve falhar se o campo 'preco' estiver ausente", async () => {
    const objetoInvalido = { ...objetoKit, preco: undefined };
    const kit = new Kit(objetoInvalido);
    try {
      await kit.validate();
    } catch (erro) {
      expect(erro.errors.preco).toBeDefined();
    }
  });

  it("Deve falhar se o campo 'item' tiver menos de 2 itens", async () => {
    const objetoInvalido = { ...objetoKit, item: [new mongoose.Types.ObjectId()] };
    const kit = new Kit(objetoInvalido);
    try {
      await kit.validate();
    } catch (erro) {
      expect(erro.errors.item).toBeDefined();
    }
  });
});
