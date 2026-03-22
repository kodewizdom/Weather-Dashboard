const TemperatureCard = () => {
  return (
    <div className="relative rounded-3xl p-6 md:p-8 text-white shadow-xl overflow-visible 
    bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500">

      {/* Location */}
      <div className="flex items-center gap-2 text-sm opacity-90">
        📍 <span className="font-medium">Dhaka</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-8">

        {/* Weather Icon */}
        <div className="text-6xl mb-5">
          ⛈️
        </div>

        {/* Date */}
        <p className="text-sm opacity-90 mb-2">
          Today, 14 April
        </p>

        {/* Temperature */}
        <p className="text-7xl font-bold leading-none mb-2 tracking-tight">
          29°
        </p>

        {/* Condition */}
        <p className="text-lg opacity-90 mb-6">
          Sunny
        </p>

        {/* Min / Max (VERTICAL STRUCTURE ✅) */}
        <div className="flex flex-col items-center gap-3 text-sm opacity-90">

          {/* Min */}
          <div className="flex items-center gap-2">
            <span className="opacity-70">Min</span>
            <div className="w-px h-4 bg-white/50"></div>
            <span className="font-medium">28°C</span>
          </div>

          {/* Max */}
          <div className="flex items-center gap-2">
            <span className="opacity-70">Max</span>
            <div className="w-px h-4 bg-white/50"></div>
            <span className="font-medium">35°C</span>
          </div>

        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300 rounded-full opacity-30 blur-3xl"></div>

    </div>
  );
};

export default TemperatureCard;