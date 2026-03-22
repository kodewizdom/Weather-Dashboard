import { Droplet, DropletIcon, Wind } from "lucide-react";
import React from "react";

const WindCard = ({ data }) => {
  if (!data) return null;

  const wind = data.current.wind_speed_10m;
  const pop = data.daily.precipitation_probability_max[0];

  return (
    <div className="relative rounded-2xl p-5 text-white shadow-lg overflow-hidden
    bg-gradient-to-r from-pink-400 via-pink-500 to-red-400">

      
      <div className="flex justify-between items-center mb-4">
        
        <div className="flex items-center gap-2 text-sm">
          <Wind /> <span className="font-medium">Max Wind Speed</span>
          <div className="w-px h-4 bg-white/50"></div>
          <span className="opacity-80">{wind} km/h</span>
        </div>

      </div>

      
      <div className="flex justify-between items-center">

        <div className="flex items-center gap-2 text-sm">
          <DropletIcon /> <span>Max PoP</span>
          <div className="w-px h-4 bg-white/50"></div>
          <span className="opacity-80">{pop}%</span>
        </div>

      </div>

      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

    </div>
  );
};

export default WindCard;