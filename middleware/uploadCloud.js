const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mern_uploads",
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!/^image\/(jpeg|jpg|png)$/.test(file.mimetype)) {
      return cb(new Error("Only JPG, JPEG, PNG files are allowed"), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
