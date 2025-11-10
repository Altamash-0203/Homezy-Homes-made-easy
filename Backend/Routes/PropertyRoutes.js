const express = require("express");
const router = express.Router();
const Property = require("../Models/Property");
const checkAuth = require("../Middleware/auth");

// Cloudinary config (keep in case you want backend uploads later)
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

// Create property
router.post("/", checkAuth, async (req, res) => {
  try {
    const { title, type, area, city, price, whatsappNumber, images } = req.body;

    if (!images || !Array.isArray(images)) {
      return res.status(400).json({ message: "Images must be an array of URLs" });
    }

    const property = await Property.create({
      user: req.user._id,
      title,
      type,
      area,
      city,
      price,
      whatsappNumber,
      images,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all properties
router.get("/", async (req, res) => {
  const properties = await Property.find().populate("user", "name email");
  res.json(properties);
});

// Get property by ID
router.get("/:id", async (req, res) => {
  const property = await Property.findById(req.params.id).populate("user", "name email");
  if (property) res.json(property);
  else res.status(404).json({ message: "Property not found" });
});

// Update property (only owner)
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

// Delete property (only owner)
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
