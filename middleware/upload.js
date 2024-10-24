const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to get the current date and time formatted as YYYY-MM-DD_HH:mm:ss
function getCurrentDateTime() {
  const now = new Date(); // Get the current date and time
  const year = now.getFullYear(); // Get the full year
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Get the month (0-indexed, so +1) and pad with zero
  const day = String(now.getDate()).padStart(2, "0"); // Get the day of the month and pad with zero

  const hours = String(now.getHours()).padStart(2, "0"); // Get the hours and pad with zero
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Get the minutes and pad with zero
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Get the seconds and pad with zero

  // Format the date and time as YYYY-MM-DD_HH:mm:ss
  return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const candidateId = req.headers["candidate_id"]; // Get candidate ID from headers

    if (!candidateId) {
      console.error("Candidate ID is missing from the request headers");
      return cb(new Error("Candidate ID is missing")); // Return error if ID is missing
    }

    // Define folder path with candidateId
    const folderPath = path.join(
      __dirname,
      "../uploads",
      candidateId.toString()
    );

    // Check if the directory exists
    if (!fs.existsSync(folderPath)) {
      try {
        // Create the directory if it doesn't exist
        fs.mkdirSync(folderPath, { recursive: true });
      } catch (error) {
        console.error(`Error creating folder: ${error.message}`);
        return cb(new Error("Error creating folder")); // Return error if folder creation fails
      }
    } else {
      console.log(`Folder already exists: ${folderPath}`);
    }

    // Set the destination folder
    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    const villageName = req.body.village_name || "default_village"; // Use default name if none provided
    const timestamp=new Date().getTime();
    const fileExtension = path.extname(file.originalname);

    // Set file name as village_name_timestamp.extension
    const newFileName = `${villageName}_${timestamp}${fileExtension}`;

    cb(null, newFileName); // Set the new file name
  },
});

// Initialize the upload middleware with multer and storage configuration
const upload = multer({ storage });

module.exports = upload;



