const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to generate the current date and time
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const candidateId = req.headers["candidate_id"];
    if (!candidateId) {
      return cb(new Error("Candidate ID is missing"));
    }
    const folderPath = path.join(
      __dirname,
      "../uploads",
      candidateId.toString()
    );
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const villageName = req.headers["village_name"] || "default_village";
    const timestamp = new Date().getTime();
    const fileExtension = path.extname(file.originalname);
    const newFileName = `${villageName}_${timestamp}${fileExtension}`;
    cb(null, newFileName);
  },
});

// Multer configuration to handle multiple files
const uploadMultiFiles = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    cb(null, true); // Accept all files
  },
}).fields([{ name: "files", maxCount: 10 }]);

// Export multer
module.exports = uploadMultiFiles;
