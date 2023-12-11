import multer from "multer";
import multerConfig from "../../config/multer.js";

const uploadMdw = multer({
  storage: multerConfig,
});

export default uploadMdw;
