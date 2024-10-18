const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/excelFiles"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Unique filename
  },
});

// Allow multiple file uploads
const upload = multer({ storage }).fields([{ name: "images", maxCount: 10 }]); // Adjust the field name and limit as needed

module.exports = upload;
