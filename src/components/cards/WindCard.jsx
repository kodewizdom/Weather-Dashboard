import React from "react";

const WindCard = () => {
  return (
    <div className="relative rounded-2xl p-5 text-white shadow-lg overflow-hidden
    bg-gradient-to-r from-pink-400 via-pink-500 to-red-400">

      {/* Top Row */}
      <div className="flex justify-between items-center mb-4">
        
        {/* Left - Wind */}
        <div className="flex items-center gap-2 text-sm">
          🌬️ <span className="font-medium">Max Wind Speed</span>
          <div className="w-px h-4 bg-white/50"></div>
          <span className="opacity-80">15 km/h</span>
        </div>

        {/* Right - Location
        <div className="flex items-center gap-1 text-sm opacity-90">
          📍 <span>Tokyo</span>
        </div> */}

      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center">

        {/* Left - Humidity */}
        <div className="flex items-center gap-2 text-sm">
          💧 <span>Max PoP</span>
          <div className="w-px h-4 bg-white/50"></div>
          <span className="opacity-80">28%</span>
        </div>

        {/* Right - Temperature
        <div className="text-3xl font-bold">
          26°
        </div> */}

      </div>

      {/* Glow effect (optional) */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

    </div>
  );
};

export default WindCard;