const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadPhoto } = require("../controller/product");

const upload = multer({ dest: "uploads/" }); // Temporary storage

router.post("/upload", upload.single("photo"), uploadPhoto);

module.exports = router;
