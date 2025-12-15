import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Favrioutes() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("homzyToken");
        if (!token) {
          alert("Please login first");
          navigate("/login");
          return;
        }

        // Fetch favorites from backend
        const res = await axios.get(
          "https://homzy-backend.onrender.com/api/users/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFavorites(res.data); // set response data to state
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [navigate]);

  // Loading state
  if (loading)
    return <p className="p-5 text-center text-xl font-semibold">Loading favorites...</p>;

  // Error state
  if (error)
    return <p className="p-5 text-center text-red-500 font-semibold">{error}</p>;

  return (
    <>
      <div className="text-center text-2xl font-bold p-5">
        My Favorite Properties
      </div>

      {favorites.length === 0 && (
        <p className="text-center text-lg">No favorites found.</p>
      )}

      <div className="bg-gray-200 p-10 rounded-xl flex flex-wrap justify-center items-center gap-10 m-10">
        {favorites.map((property) => (
          <div
            key={property._id}
            className="hover:border-2 hover:shadow-md shadow-gray-500 bg-gray-200 flex flex-col gap-3 rounded p-3"
          >
            <img
              className="w-80 h-60 rounded-2xl bg-gray-300 p-3"
              src={
                property.images && property.images.length > 0
                  ? property.images[0]
                  : "/placeholder.png"
              }
              alt={property.title}
            />

            <div className="flex justify-evenly mt-3 gap-10">
              <div className="flex items-center gap-2">
                <img
                  className="w-4 h-4"
                  src="https://img.icons8.com/ultraviolet/40/marker.png"
                  alt="marker"
                />
                <p className="font-medium">{property.city}</p>
              </div>

              <div className="flex items-center gap-2">
                <img
                  className="w-4 h-4"
                  src="https://img.icons8.com/ultraviolet/50/home.png"
                  alt="home"
                />
                <p className="font-medium">{property.type}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-semibold">₹{property.price}</p>
            </div>

            <button
              onClick={() => navigate(`/${property._id}`)}
              className="p-2 w-full bg-violet-600 text-white rounded text-center"
            >
              See Detail
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Favrioutes;
