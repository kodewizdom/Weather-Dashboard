import { CloudRainWind } from "lucide-react";
import React from "react";

const AtmosphericCard = ({ data }) => {
  const precipitation = data?.current?.precipitation ?? "--";
  const humidity = data?.current?.relative_humidity_2m ?? "--";
  const uv = data?.current?.uv_index ?? "--";

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5">

      <h2 className="text-gray-500 text-sm mb-4 flex items-center gap-2">
        <CloudRainWind /> Atmospheric
      </h2>

      <div className="bg-gray-50 rounded-xl p-4 space-y-4">

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Precipitation</span>
          <span className="text-sm font-semibold text-gray-800">
            {precipitation} mm
          </span>
        </div>

        <div className="h-px bg-gray-200"></div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Humidity</span>
          <span className="text-sm font-semibold text-gray-800">
            {humidity}%
          </span>
        </div>

        <div className="h-px bg-gray-200"></div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">UV Index</span>
          <span className="text-sm font-semibold text-indigo-500">
            {uv}
          </span>
        </div>

      </div>
    </div>
  );
};

export default AtmosphericCard;