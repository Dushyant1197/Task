const Photo = require("../model/product");
const path = require("path");
const fs = require("fs");

const uploadPhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const photo = {
    fileName: req.file.originalname,
    path: req.file.path,
  };

  try {
    await Photo.create(photo);
    res.status(201).json({ message: "Photo uploaded successfully", photo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFile = async (req, res) => {
  const id = req.params.id;
  const data = Photo.findByPk(id);
  res.download(data);
};

module.exports = {
  uploadPhoto,
};
