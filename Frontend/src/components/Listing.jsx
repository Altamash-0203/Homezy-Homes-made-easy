import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Listing() {
  const [data, setData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  const [filters, setFilters] = useState({
    city: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });
  let navigate=useNavigate()


  function nvaigator(id){
    
    navigate(`/:${id}`)
  }

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties");
      setData(res.data);
      setFiltredData(res.data)
      console.log(res.data)
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

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
    setFiltredData(filtered);
  };

  return (
    <>
      {/* Navbar with Filters */}
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

        {/* Add Property Button */}
        <button
          onClick={() => window.location.href = "/add-property"}
          className="bg-black text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Link to="/add-property">Add property</Link>
        </button>
      </div>

      {/* Property Listing */}
      <div className="bg-gray-200 p-10 rounded-xl flex flex-wrap justify-center items-center gap-9.5 m-10">
        {filtredData.map((p) => (
          <div
            key={p._id}
            className="hover:border-2 hover:shadow-xs shadow-gray-500 bg-gray-200  flex flex-col justify-center gap-3 rounded-l p-2"
          >
            <img
              className="w-90 h-60 rounded-2xl bg-gray-300 p-3"
              src={p.images[0]}
              alt={p.title}
            />
            <div className="flex justify-evenly mt-5 gap-10">
              <div className="flex justify-center items-center">
                <img
                  className="w-4 h-4"
                  src="https://img.icons8.com/ultraviolet/40/marker.png"
                  alt="marker"
                />
                <p className="font-medium">{p.city}</p>
              </div>

              <div className="flex justify-center items-center">
                <img
                  className="w-4 h-4"
                  src="https://img.icons8.com/ultraviolet/50/home.png"
                  alt="home"
                />
                <p className="font-medium">{p.type}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl">₹{p.price}</p>
            </div>
            <div className="ml-3 flex flex-wrap justify-evenly gap-3">
              <button className="p-2 w-full rounded bg-black text-white">
                Add to Fav
                
              </button>
              <button onClick={navigator(this._id)} className="p-2 w-full bg-violet-600 text-white rounded">
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
