import NaoEncontrado from "../erros/NaoEncontrado.js";
import { itens, kits } from "../models/index.js";

class KitController {

  static  listarKits = async (req, res, next) => {
    try {
      const buscaKits =  kits.find();

      res.resultado = buscaKits;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static  listarKitPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const kitResultado = await kits.findById(id)
        .populate("item", "nome")
        .exec();
      
      if (kitResultado !== null) {
        res.status(200).send(kitResultado);
      } else {
        next(new NaoEncontrado("Id do kit não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };


  static  cadastrarKit = async (req, res, next) => {

    try {
      let kit = new kits(req.body);
      const kitResultado = await kit.save();

      res.status(201).send(kitResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static  atualizarKit = async (req, res, next) => {
    try {
      const id = req.params.id;
      const kitResultado = await kits.findByIdAndUpdate(id, {$set: req.body});
    
      if (kitResultado !== null) {
        res.status(200).send({message: "kit atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do kit não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static  excluirKit = async (req, res, next) => {
    try {
      const id = req.params.id;
      const kitResultado = await kits.findByIdAndDelete(id);
      
      if (kitResultado !== null) {
        res.status(200).send({message: "kit removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do kit não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };


  static  listarKitPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);
 
      if (busca !== null) {
        const kitsResultado =  kits
          .find(busca)
          .populate("item");
   
        res.resultado = kitsResultado;

        next();
      } else {
        res.status(200).send([]);
      }
 
    } catch (erro) {
      next(erro);
    }
  };
}
 
async function processaBusca(parametros) {
 
  const { titulo, preco, nomeItem } = parametros;
 
  let busca = {};
 
  if(titulo) busca.titulo = { $regex: titulo, $options: "i"};
 
  if(preco) busca.preco = preco;
 
  if(nomeItem) {
    const item = await itens.findOne({ nome: nomeItem });
 
    if (item !== null) {
      busca.item = item._id;
    } else {
      busca = null;
    }
 
  }
 
  return busca;
 
}
 


export default KitController;

