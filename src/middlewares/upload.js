import multer from "multer";
import path from "path";

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/"); // Pasta onde as imagens serão salvas
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Nome do arquivo
  }
});

// Filtros de tipo de arquivo
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Apenas imagens são permitidas!"));
  }
};

// Limite de tamanho de arquivo (opcional)
const limits = { fileSize: 1024 * 1024 * 5 }; // 5MB

// Configuração do multer
const upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter
});

export default upload;
