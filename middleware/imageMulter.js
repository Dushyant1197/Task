const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Allow multiple file uploads
const upload = multer({ storage }).fields([{ name: "images", maxCount: 10 }]); // Adjust the field name and limit as needed

module.exports = upload;
