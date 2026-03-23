import { useState } from "react";

const Navbar = () => {
  const [unit, setUnit] = useState("C");

  const getTodayDate = () => {
  return new Date().toLocaleDateString("en-CA");
};

  const [selectedDate, setSelectedDate] = useState(getTodayDate());

  return (
    <div className="bg-white shadow-md px-4 py-3 md:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-indigo-600">???</h1>

        <div className="flex flex-col md:flex-row gap-3 md:items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Search location..."
            className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex w-full justify-between">
            <button
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
              °{unit}
            </button>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
