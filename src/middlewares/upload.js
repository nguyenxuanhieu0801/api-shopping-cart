import multer from "multer";
import path from "path";

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error("Unsupported files"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathUploads = path.join(__dirname, "../../uploads");
    cb(null, pathUploads);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
  fileFilter,
});

export default upload;
