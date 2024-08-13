import Picture from "../models/Picture.js";

class PictureController {

  // criar img
  static uploadImage = async (req, res, next) => {
    try {
      const { file } = req;

      if (!file) {
        return res.status(400).json({ message: "Nenhum arquivo enviado." });
      }

      const newPicture = new Picture({
        filename: file.filename,
        path: file.path,
        originalname: file.originalname
      });

      await newPicture.save();

      res.status(201).json({ message: "Imagem enviada com sucesso!", data: newPicture });
    } catch (erro) {
      next(erro);
    }
  };

  // Ler todas as imgs
  static getAllImages = async (req, res, next) => {
    try {
      const pictures = await Picture.find();
      res.status(200).json({ data: pictures });
    } catch (erro) {
      next(erro);
    }
  };

  // Ler uma única imagem por ID
  static getImageById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const picture = await Picture.findById(id);

      if (!picture) {
        return res.status(404).json({ message: "Imagem não encontrada." });
      }

      res.status(200).json({ data: picture });
    } catch (erro) {
      next(erro);
    }
  };

  // Atualizar img por ID
  static updateImage = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { originalname } = req.body;

      const picture = await Picture.findByIdAndUpdate(id, { originalname }, { new: true });

      if (!picture) {
        return res.status(404).json({ message: "Imagem não encontrada." });
      }

      res.status(200).json({ message: "Imagem atualizada com sucesso!", data: picture });
    } catch (erro) {
      next(erro);
    }
  };

  // Deleta uma img por ID
  static deleteImage = async (req, res, next) => {
    try {
      const { id } = req.params;

      const picture = await Picture.findByIdAndDelete(id);

      if (!picture) {
        return res.status(404).json({ message: "Imagem não encontrada." });
      }

      // Remove o arquivo do sistema de arquivos
      fs.unlink(path.resolve(picture.path), (err) => {
        if (err) {
          console.error(err);
          return next(err);
        }
      });

      res.status(200).json({ message: "Imagem deletada com sucesso!" });
    } catch (erro) {
      next(erro);
    }
  };
}

export default PictureController;