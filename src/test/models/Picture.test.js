import { describe, expect, it, jest, beforeAll, afterAll, afterEach } from "@jest/globals";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Picture from "../../models/Picture.js";

describe("Testando o modelo Picture", () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await Picture.deleteMany({});
  });

  const objetoPicture = {
    filename: "Filename da Picture de Teste",
    path: "caminho/para/picture",
    originalname: "Nome original da Picture de teste",
    createdAt: new Date(),
  };

  it("Deve instanciar uma nova Picture", () => {
    const picture = new Picture(objetoPicture);

    expect(picture).toEqual(expect.objectContaining(objetoPicture));
  });

  it("Deve salvar Picture no BD", async () => {
    const picture = new Picture(objetoPicture);
    const dados = await picture.save();

    expect(dados.filename).toBe("Filename da Picture de Teste");
  });

  it("Deve salvar no BD usando a sintaxe moderna", async () => {
    const picture = new Picture(objetoPicture);
    const dados = await picture.save();
    const retornado = await Picture.findById(dados._id);

    expect(retornado).toEqual(
      expect.objectContaining({
        ...objetoPicture,
        _id: expect.any(mongoose.Types.ObjectId),
      })
    );
  });

  it("Deve fazer uma chamada simulada ao BD", () => {
    const picture = new Picture(objetoPicture);

    picture.save = jest.fn().mockReturnValue({
      _id: new mongoose.Types.ObjectId(),
      ...objetoPicture,
      createdAt: "2022-10-01",
      updatedAt: "2022-10-01",
    });

    const retorno = picture.save();

    expect(retorno).toEqual(
      expect.objectContaining({
        _id: expect.any(mongoose.Types.ObjectId),
        ...objetoPicture,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
  });

  it("Deve falhar se o campo \"filename\" estiver ausente", async () => {
    const objetoInvalido = { ...objetoPicture, filename: undefined };
    const picture = new Picture(objetoInvalido);

    try {
      await picture.validate();
    } catch (erro) {
      expect(erro.errors.filename).toBeDefined();
    }
  });

  it("Deve falhar se o campo \"path\" estiver ausente", async () => {
    const objetoInvalido = { ...objetoPicture, path: undefined };
    const picture = new Picture(objetoInvalido);

    try {
      await picture.validate();
    } catch (erro) {
      expect(erro.errors.path).toBeDefined();
    }
  });

  it("Deve falhar se o campo \"originalname\" estiver ausente", async () => {
    const objetoInvalido = { ...objetoPicture, originalname: undefined };
    const picture = new Picture(objetoInvalido);

    try {
      await picture.validate();
    } catch (erro) {
      expect(erro.errors.originalname).toBeDefined();
    }
  });
});

