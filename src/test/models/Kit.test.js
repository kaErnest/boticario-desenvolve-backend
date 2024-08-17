import mongoose from "mongoose";
import { describe, expect, it } from "@jest/globals";
import Kit from "../../models/Kit.js";

describe("Testando o modelo Kit", () => {
  const objetoKit = {
    id: "123",
    image: new mongoose.Types.ObjectId(),
    titulo: "Kit de Teste",
    item: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    preco: 80,
  };

  it("Deve instanciar um novo kit", async () => {
    const kit = new Kit(objetoKit);
    await kit.validate();
    expect(kit.titulo).toBe(objetoKit.titulo);
    expect(kit.item.length).toBeGreaterThanOrEqual(2);
    expect(kit.preco).toBe(objetoKit.preco);
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
