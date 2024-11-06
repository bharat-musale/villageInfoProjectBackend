const e = require("express");
const Village = require("../models/Village");

exports.addVillage = async (req, res) => {
  const { village_name, description, youtube_link1, youtube_link2, admin_id } =
    req.body;
  const candidateId_int = req.headers["candidate_id"]; // Get candidate_id from headers
  const candidate_id = parseInt(candidateId_int);

  if (!candidate_id) {
    return res.status(400).json({ message: "Candidate ID is missing" });
  }
  const image1 = req.files?.image1 ? req.files.image1[0].filename : null;
  const image2 = req.files?.image2 ? req.files.image2[0].filename : null;
  try {
    const village = await Village.create({
      village_name,
      description,
      youtube_link1,
      youtube_link2,
      image1,
      image2,
      admin_id,
      candidate_id,
    });

    console.log("Village created:", village);

    res.status(201).json({
      status_code: 200,
      status_message: "Village added successfully",
      village,
    });
  } catch (error) {
    console.error("Error creating village:", error);

    res.status(400).json({
      status_code: 400,
      message: error.message,
    });
  }
};

exports.getAllVillages = async (req, res) => {
  const { candidate_id } = req.params;
  try {
    const villages = await Village.findAll();
    res
      .status(200)
      .json({
        status_message: 200,
        message: "Villages fetched successfully",
        data: villages,
      });
  } catch (error) {
    res.status(400).json({ message: "Error fetching villages" });
  }
};

exports.getVillageByName = async (req, res) => {
  const { village } = req.params; // Destructure village name from req.params

  try {
    const foundVillage = await Village.findOne({
      where: { village_name: village },
    }); 

    if (!foundVillage) {
      return res.status(404).json({ message: "Village not found" }); // Handle not found
    }

    res.json(foundVillage); // Respond with the village data
  } catch (error) {
    console.error("Error fetching village:", error);
    res.status(500).json({ message: "Error fetching village information" });
  }
};

exports.editVillage = async (req, res) => {
  const { id } = req.params;

  // Get uploaded files
  const files = req.files["files"]; // Files from multer
  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded." });
  }

  // Construct filenames for storage in the database
  const newFileNames = files.map((file) => file.filename);

  try {
    // Fetch the current village data to check existing images
    const village = await Village.findByPk(id); // Fetch village by ID
    if (!village) {
      return res.status(404).json({ message: "Village not found." });
    }

    // Prepare the updated images
    let updatedImages;
    if (village.images) {
      // Split existing images into an array
      const existingImages = village.images.split(",");

      // Append new images to existing images if they are not already present
      updatedImages = [...new Set([...existingImages, ...newFileNames])]; // Use Set to avoid duplicates
    } else {
      // If no existing images, just use the new ones
      updatedImages = newFileNames;
    }

    // Update the village with the new images
    await Village.update(
      {
        images: updatedImages.join(","), // Update the images
      },
      { where: { id: id } }
    );

    // Send a successful response
    res
      .status(200)
      .json({
        message: "Village updated successfully.",
        images: updatedImages,
      });
  } catch (error) {
    console.error("Error updating village:", error);
    res.status(500).json({ message: "Error updating village information" });
  }
};


exports.getVillageByVillage_id = async (req, res) => {
  const { village_id } = req.params; // Correct extraction from req.params

  console.log("village id:", village_id);

  try {
    // Correct the query to search by village_id, if it's the field in your schema
    const foundVillage = await Village.findOne({ id: village_id });

    if (!foundVillage) {
      return res.status(404).json({ message: "Village not found" });
    }

    console.log(foundVillage);
    res.json(foundVillage); // Respond with the village data
  } catch (error) {
    console.error("Error fetching village:", error);
    res.status(500).json({ message: "Error fetching village information" });
  }
};

exports.getVillageByCandidate_id = async (req, res) => {
  const { candidate_id } = req.params;
  try {
    const villages = await Village.findAll({ where: { candidate_id } });
    res
      .status(200)
      .json({
        status_message: 200,
        message: "Villages fetched successfully",
        data: villages,
      });
  } catch (error) {
    res.status(400).json({ message: "Error fetching villages" });
  }
};

exports.deleteVillageByCandidate_id = async (req, res) => {
  const { candidate_id } = req.params;
  try {
    await Village.destroy({ where: { candidate_id } });
    res.json({ message: "Villages deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting villages" });
  }
};

exports.deleteVillage = async (req, res) => {
  const { villageId } = req.params;
  try {
    await Village.destroy({ where: { id: villageId } });
    res.json({ message: "Village deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting village" });
  }
};
