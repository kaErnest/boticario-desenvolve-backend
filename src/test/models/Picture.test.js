import mongoose from "mongoose";
import { describe, expect, it } from "@jest/globals";
import Picture from "../../models/Picture.js";

describe("Testando o modelo Picture", () => {
  const objetoPicture = {
    filename: "Filename da Picture de Teste",
    path: "caminho/para/picture",
    originalname: "Nome original da Picture de teste",
    createdAt: new Date(),
  };

  it("Deve instanciar um novo Picture", async () => {
    const picture = new Picture(objetoPicture);
    await picture.validate(); // Validação assíncrona
    expect(picture.filename).toBe(objetoPicture.filename);
    expect(picture.path).toBe(objetoPicture.path);
    expect(picture.originalname).toBe(objetoPicture.originalname);
    expect(picture.createdAt).toEqual(objetoPicture.createdAt);
  });

  it("Deve falhar se o campo 'filename' estiver ausente", async () => {
    const objetoInvalido = { ...objetoPicture, filename: undefined };
    const picture = new Picture(objetoInvalido);

    try {
      await picture.validate();
    } catch (erro) {
      expect(erro.errors.filename).toBeDefined();
    }
  });

  it("Deve falhar se o campo 'path' estiver ausente", async () => {
    const objetoInvalido = { ...objetoPicture, path: undefined };
    const picture = new Picture(objetoInvalido);

    try {
      await picture.validate();
    } catch (erro) {
      expect(erro.errors.path).toBeDefined();
    }
  });

  it("Deve falhar se o campo 'originalname' estiver ausente", async () => {
    const objetoInvalido = { ...objetoPicture, originalname: undefined };
    const picture = new Picture(objetoInvalido);

    try {
      await picture.validate();
    } catch (erro) {
      expect(erro.errors.originalname).toBeDefined();
    }
  });
});

