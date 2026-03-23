import { MapPin, Moon, Sun } from "lucide-react";
import React from "react";

const SunCycleCard = ({ data, city }) => {
  const sunriseRaw = data?.daily?.sunrise?.[0];
  const sunsetRaw = data?.daily?.sunset?.[0];

  const formatTime = (timeStr) => {
    if (!timeStr) return "--";

    const date = new Date(timeStr);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sunrise = formatTime(sunriseRaw);
  const sunset = formatTime(sunsetRaw);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5">

      <h2 className="text-gray-500 text-sm mb-4">
        Sunrise & Sunset
      </h2>

      
      <div className="bg-orange-50 rounded-xl p-4">

        
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin/> <span >{city || "--"}</span>
        </div>

        
        <div className="flex justify-between items-center">

          
          <div className="flex items-center gap-3">
            <div className="text-2xl"><Sun /></div>
            <div>
              <p className="text-xs text-gray-400">Sunrise</p>
              <p className="text-sm font-semibold text-blue-500">
                {sunrise}
              </p>
            </div>
          </div>

          
          <div className="flex items-center gap-3">
            <div className="text-2xl"><Moon/></div>
            <div>
              <p className="text-xs text-gray-400">Sunset</p>
              <p className="text-sm font-semibold text-blue-500">
                {sunset}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SunCycleCard;