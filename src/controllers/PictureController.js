import Picture from "../models/Picture.js";

class PictureController {

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

}

export default PictureController;
