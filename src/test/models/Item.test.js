import mongoose from "mongoose";
import { describe, expect, it } from "@jest/globals";
import Item from "../../models/Item.js";

describe("Testando o modelo Item", () => {
  const objetoItem = {
    id: "123",
    image: new mongoose.Types.ObjectId(),
    nome: "Item de Teste",
    descricao: "Descrição do item de teste",
    preco: 80
  };

  it("Deve instanciar um novo item", async () => {
    const item = new Item(objetoItem);
    await item.validate(); // Usando validação assíncrona

    expect(item).toEqual(expect.objectContaining(objetoItem));
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
