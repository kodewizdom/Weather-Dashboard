import React from "react";

const AtmosphericCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5">

      {/* Title */}
      <h2 className="text-gray-500 text-sm mb-4 flex items-center gap-2">
        🌧️ Atmospheric
      </h2>

      {/* Inner Card */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-4">

        {/* Precipitation */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Precipitation</span>
          <span className="text-sm font-semibold text-gray-800">12 mm</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* Humidity */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Humidity</span>
          <span className="text-sm font-semibold text-gray-800">68%</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200"></div>

        {/* UV Index */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">UV Index</span>
          <span className="text-sm font-semibold text-indigo-500">6</span>
        </div>

      </div>
    </div>
  );
};

export default AtmosphericCard;