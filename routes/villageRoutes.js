const express = require("express");
const {
  addVillage,
  getAllVillages,
  deleteVillage,
  getVillageByName,
  getVillageByCandidate_id,
  deleteVillageByCandidate_id,
  getVillageByVillage_id,
  editVillage,
} = require("../controllers/villageController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const uploadMultiFiles = require("../middleware/uploadMultiFiles");
const router = express.Router();
const multer = require("multer");


router.post(
  "/add",
  authMiddleware,
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  addVillage
);
router.post("/edit/:id", authMiddleware, uploadMultiFiles, editVillage);
router.get("/all",  getAllVillages);
router.get("/:candidate_id", getVillageByCandidate_id);
router.get("/:village_id", authMiddleware, getVillageByVillage_id);
router.get("/villagename/:village", getVillageByName);
router.get("/all/:candidate_id",authMiddleware, getVillageByCandidate_id);
router.delete("/delete/:villageId", authMiddleware, deleteVillage);
router.delete("/delete/:candidate_id",authMiddleware,deleteVillageByCandidate_id);

module.exports = router;
