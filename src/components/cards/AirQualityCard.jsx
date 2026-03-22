import React from "react";

const AirQualityCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5 md:col-span-2 lg:col-span-2">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-600 text-sm font-medium">
          Air Quality Index
        </h2>

        <div className="text-sm text-gray-400 flex items-center gap-1">
          📍 <span>Uttara, Dhaka</span>
        </div>
      </div>

      {/* AQI Status */}
      <div className="flex justify-between items-center mb-4">

        <div className="flex items-center gap-3">
          <div className="text-2xl">🌿</div>

          <div>
            <p className="text-green-500 font-semibold text-sm">
              Good
            </p>
            <p className="text-xs text-gray-400">
              A perfect day for a walk!
            </p>
          </div>
        </div>

        <button className="text-sm text-blue-500 hover:underline">
          Refresh
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">

        {[
          { label: "PM10", value: "9.3" },
          { label: "PM2.5", value: "12.2" },
          { label: "CO", value: "4.8" },
          { label: "CO₂", value: "4.6" },
          { label: "NO₂", value: "6.5" },
          { label: "SO₂", value: "0.9" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-green-50 rounded-lg p-3 text-center"
          >
            <p className="text-sm font-semibold text-green-600">
              {item.value}
            </p>
            <p className="text-xs text-gray-400">
              {item.label}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
};

export default AirQualityCard;