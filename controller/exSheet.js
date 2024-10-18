const excelData = require("../model/exSheet");
const csv = require("");

const userExcelData = async (req, res) => {
  try {
    const excelFileData = req.files;
    console.log("FILES DATA : ", excelFileData);
  } catch (error) {
    console.log("error : ", error);
  }
};
module.exports = { userExcelData };
