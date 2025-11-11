const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./Routes/UserRoutes");
const propertyRoutes = require("./Routes/PropertyRoutes");

dotenv.config();
const app = express();

// CORS - allow frontend URLs
app.use(cors({
  origin: ["http://localhost:3000","http://localhost:5173", "https://sweet-meringue-710bd4.netlify.app/"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", authRoutes);
app.use("/api/properties", propertyRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
