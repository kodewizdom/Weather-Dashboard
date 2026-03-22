import React from "react";

const SunCycleCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5">

      {/* Title */}
      <h2 className="text-gray-500 text-sm mb-4">
        🌅 Sunrise & Sunset
      </h2>

      {/* Inner Soft Card */}
      <div className="bg-orange-50 rounded-xl p-4">

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          📍 <span>Sunrise & Sunset</span>
        </div>

        {/* Sunrise & Sunset Row */}
        <div className="flex justify-between items-center">

          {/* Sunrise */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">☀️</div>
            <div>
              <p className="text-xs text-gray-400">Sunrise</p>
              <p className="text-sm font-semibold text-blue-500">
                4:40 AM
              </p>
            </div>
          </div>

          {/* Sunset */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">🌙</div>
            <div>
              <p className="text-xs text-gray-400">Sunset</p>
              <p className="text-sm font-semibold text-blue-500">
                6:53 PM
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SunCycleCard;