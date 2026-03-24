import { useState } from "react";
import { fetchCoordsFromCity } from "../services/weatherApi";
import { CircleDot } from "lucide-react";

const Navbar = ({ unit, setUnit, setLocation, setCity }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    const results = await fetchCoordsFromCity(value);
    setSuggestions(results);
  };

  const handleSelect = (place) => {
    setLocation({
      lat: place.latitude,
      lon: place.longitude,
    });

    const fullName = `${place.name}${
      place.admin1 ? `, ${place.admin1}` : ""
    }${place.country ? `, ${place.country}` : ""}`;

    setCity(fullName);
    setSearch(fullName);
    setSuggestions([]);
  };

  return (
    <div className="bg-white shadow-md px-4 py-3 md:px-6 lg:px-8 relative">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold flex">
          <span className="text-orange-500"><CircleDot/></span>
          <span className="text-black">‿</span>
          <span className="text-orange-500"><CircleDot/></span>
        </h1>

        <div className="flex flex-row gap-3 md:items-center w-full md:w-auto relative">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search location..."
            className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* DROPDOWN */}
          {suggestions.length > 0 && (
            <div className="absolute top-12 left-0 w-full md:w-64 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {suggestions.map((place, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(place)}
                  className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-sm"
                >
                  {place.name}
                  {place.admin1 ? `, ${place.admin1}` : ""}
                  {place.country ? `, ${place.country}` : ""}
                </div>
              ))}
            </div>
          )}

          {/* UNIT BUTTON */}
          <button
            onClick={() => setUnit(unit === "C" ? "F" : "C")}
            className="px-4 py-2 bg-indigo-500 cursor-pointer text-white rounded-lg hover:bg-indigo-600 transition"
          >
            °{unit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
