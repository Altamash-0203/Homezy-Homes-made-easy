import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Listing() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  const navigate = useNavigate();

  // -------------------------------
  // Navigate to property detail
  // -------------------------------
  const goToDetail = (id) => {
    navigate(`/${id}`);
  };

  // -------------------------------
  // Fetch all properties
  // -------------------------------
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        "https://homzy-backend.onrender.com/api/properties"
      );
      setData(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  // -------------------------------
  // Handle filter change
  // -------------------------------
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------------------
  // Apply filters
  // -------------------------------
  const applyFilters = () => {
    const filtered = data.filter((p) => {
      const matchCity = filters.city
        ? p.city.toLowerCase().includes(filters.city.toLowerCase())
        : true;

      const matchType = filters.type
        ? p.type.toLowerCase().includes(filters.type.toLowerCase())
        : true;

      const matchPrice =
        (filters.minPrice ? p.price >= Number(filters.minPrice) : true) &&
        (filters.maxPrice ? p.price <= Number(filters.maxPrice) : true);

      return matchCity && matchType && matchPrice;
    });

    setFilteredData(filtered);
  };

  // -------------------------------
  // Add to Favorites
  // -------------------------------
  const addToFav = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      await axios.post(
        "https://homzy-backend.onrender.com/api/users/add-favorite",
        { propertyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Property added to favorites ❤️");
    } catch (error) {
      console.error(error);
      alert("Failed to add to favorites");
    }
  };

  return (
    <>
      {/* ================= Filters ================= */}
      <div className="flex flex-wrap justify-between items-center p-5 bg-gray-100 rounded-xl m-10 gap-5">
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="p-2 rounded border border-gray-300"
          />

          <input
            type="text"
            placeholder="Type (1BHK, 2BHK, etc.)"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            className="p-2 rounded border border-gray-300"
          />

          <input
            type="number"
            placeholder="Min Price"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="p-2 rounded border border-gray-300"
          />

          <input
            type="number"
            placeholder="Max Price"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="p-2 rounded border border-gray-300"
          />

          <button
            onClick={applyFilters}
            className="bg-black text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>

        {/* Add Property */}
        <Link
          to="/add-property"
          className="bg-black text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Property
        </Link>
      </div>

      {/* ================= Property Listing ================= */}
      <div className="bg-gray-200 p-10 rounded-xl flex flex-wrap justify-center items-center gap-10 m-10">
        {filteredData.map((p) => (
          <div
            key={p._id}
            className="hover:border-2 hover:shadow-md shadow-gray-500 bg-gray-200 flex flex-col gap-3 rounded p-3"
          >
            <img
              className="w-80 h-60 rounded-2xl bg-gray-300 p-3"
              src={
                p.images && p.images.length > 0
                  ? p.images[0]
                  : "/placeholder.png"
              }
              alt={p.title}
            />

            <div className="flex justify-evenly mt-3 gap-10">
              <div className="flex items-center gap-2">
                <img
                  className="w-4 h-4"
                  src="https://img.icons8.com/ultraviolet/40/marker.png"
                  alt="marker"
                />
                <p className="font-medium">{p.city}</p>
              </div>

              <div className="flex items-center gap-2">
                <img
                  className="w-4 h-4"
                  src="https://img.icons8.com/ultraviolet/50/home.png"
                  alt="home"
                />
                <p className="font-medium">{p.type}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-semibold">₹{p.price}</p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => addToFav(p._id)}
                className="p-2 w-full rounded bg-black text-white hover:bg-red-600"
              >
                Add to Fav ❤️
              </button>

              <button
                onClick={() => goToDetail(p._id)}
                className="p-2 w-full bg-violet-600 text-white rounded"
              >
                See Detail
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Listing;
