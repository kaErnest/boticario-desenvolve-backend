import NaoEncontrado from "../erros/NaoEncontrado.js";
import { itens } from "../models/index.js";

class ItemController {

  static listarItens =  async (req, res, next) => {
    try {
      const itensResultado =  itens.find().populate("image");

      req.resultado = itensResultado;

      next();
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarItemPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const itemResultado =  itens.findById(id).populate("image");
      if(itemResultado !== null) {
        res.status(200).send(itemResultado);
      } else {
        next(new NaoEncontrado("Id do Item não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };


  static cadastrarItem = async (req, res, next) => {
    try {
      let item = new itens(req.body);
      const itemResultado = await item.save();
      res.status(201).send(itemResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static  atualizarItem = async (req, res, next) => {
    try {
      const id = req.params.id;
      const itemResultado = await itens.findByIdAndUpdate(id, {$set: req.body});
      if(itemResultado !== null) {
        res.status(200).send({message: "Item atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Item não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static  excluirItem = async (req, res, next) => {
    try {
      const id = req.params.id;
      const itemResultado = await itens.findByIdAndDelete(id);

      if (itemResultado !== null) {
        res.status(200).send({message: "Item  removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Item não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static  listarItemPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBuscaItens(req.query);
  
      if (busca !== null) {
        const itensResultado = itens
          .find(busca);
  
        req.resultado = itensResultado;
  
        next();
      } else {
        res.status(200).send([]);
      }
  
    } catch (erro) {
      next(erro);
    }
  }; 
}

async function processaBuscaItens(parametros) {

  const { nome, preco } = parametros;

  let busca = {};

  if (nome) busca.nome = { $regex: nome, $options: "i" };

  if (preco) busca.preco = preco;

  return busca;

}

export default ItemController;