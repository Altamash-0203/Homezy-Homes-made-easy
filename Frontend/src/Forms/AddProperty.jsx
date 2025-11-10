import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    area: "",
    city: "",
    price: "",
    whatsappNumber: "",
  });
  const [images, setImages] = useState([]); // Cloudinary URLs
  const [loading, setLoading] = useState(false);
  let navigate=useNavigate()

  // Handle form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Upload images to Cloudinary
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    setLoading(true);
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("file", files[i]);
      data.append("upload_preset", "homzy_images"); 

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dqfrnmqze/image/upload",
          data
        );
        uploadedImages.push(res.data.secure_url);
        // console.log(res.data)
      } catch (err) {
        console.error("Image upload failed", err);
      }
    }

    setImages((prev) => [...prev, ...uploadedImages]);
    setLoading(false);
  };

  // Submit property
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("homzyToken");
      await axios.post(
        "http://localhost:5000/api/properties",
        { ...formData, images },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Property added successfully!");
      
      setFormData({
        title: "",
        type: "",
        area: "",
        city: "",
        price: "",
        whatsappNumber: "",
      });
      setImages([]);
      navigate("/listing")
    } catch (err) {
      console.error(err);
      alert("Failed to add property. Check console for details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Add Property</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {["title", "type", "area", "city", "price", "whatsappNumber"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "price" || field === "whatsappNumber" ? "number" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            className="border rounded p-2"
          />
        ))}

        <label className="mt-2">
          Upload Images: 📸
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="block mt-1 border bg-gray-300 text-center"
          />
        </label>

        {loading && <p>Uploading images...</p>}

        {/* Preview images */}
        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((img, i) => (
            <img key={i} src={img} alt={`property-${i}`} className="w-24 h-24 object-cover rounded" />
          ))}
        </div>

        <button
          type="submit"
          className="mt-4 bg-black text-white py-2 rounded hover:bg-gray-700"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
