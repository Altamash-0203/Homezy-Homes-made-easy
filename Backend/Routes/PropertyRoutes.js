const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const Property = require("../Models/Property");
const checkAuth = require("../Middleware/auth");

const upload = multer({ dest: "uploads/" });

//cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



// Create property
router.post("/", checkAuth, upload.array("images"), async (req,res)=>{
  try{
    const { title, type, area, city, price, whatsappNumber } = req.body;
    const images = [];

    if(req.files){
      for(const file of req.files){
        const result = await cloudinary.v2.uploader.upload(file.path, { folder: "properties" });
        images.push(result.secure_url);
      }
    }

    const property = await Property.create({
      user: req.user._id,
      title,
      type,
      area,
      city,
      price,
      whatsappNumber,
      images
    });

    res.status(201).json(property);
  }catch(error){
    res.status(400).json({ message: error.message });
  }
});

// Get all properties
router.get("/", async (req,res)=>{
  const properties = await Property.find().populate("user","name email");
  res.json(properties);
});

// Get property by ID
router.get("/:id", async (req,res)=>{
  const property = await Property.findById(req.params.id).populate("user","name email");
  if(property) res.json(property);
  else res.status(404).json({ message: "Property not found" });
});


// ✅ Update property (only owner)
router.put("/:id", checkAuth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    if (property.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete property (only owner)
router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });

    if (property.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await property.deleteOne();
    res.json({ message: "Property removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;