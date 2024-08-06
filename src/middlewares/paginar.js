import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    let { limite = 4, pagina = 1, ordenacao = "_id:-1" } = req.query;

    let [campoOrdenação, ordem] = ordenacao.split(":");
    
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if (limite > 0 && pagina >0) {
      const resultadoPaginado = await resultado.find()
        .sort({ [campoOrdenação]: ordem })
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();
    
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }
  } catch (erro) {
    next(erro);
  }

}

export default paginar;