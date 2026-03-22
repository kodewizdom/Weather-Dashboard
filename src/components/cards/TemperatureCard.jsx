import { MapPin } from "lucide-react";
import { getWeatherIcon } from "../../utils/weatherIcons";

const TemperatureCard = ({ data, city }) => {
  if (!data) {
    return (
      <div className="relative rounded-3xl p-6 md:p-8 text-white shadow-xl bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500">
        Loading...
      </div>
    );
  }

  // ✅ Extract data from API
  const temp = data.current.temperature_2m;
  const min = data.daily.temperature_2m_min[0];
  const max = data.daily.temperature_2m_max[0];
  const code = data.current.weather_code;
  const isDay = data.current.is_day === 1;

  return (
    <div
      className="relative rounded-3xl p-6 md:p-8 text-white shadow-xl overflow-visible 
    bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500"
    >
      {/* Location */}
      <div className="flex items-center gap-2 text-sm opacity-90">
        <MapPin /><span className="font-medium">{city || "Loading..."}</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-8">
        {/* Weather Icon */}
        <div className="text-6xl mb-5">{getWeatherIcon(code,isDay, 64)}</div>

        {/* Date
        <p className="text-sm opacity-90 mb-2">
          Today
        </p> */}

        {/* Temperature */}
        <p className="text-7xl font-bold leading-none mb-2 tracking-tight">
          {temp}°
        </p>

        {/* Condition */}
        <p className="text-lg opacity-90 mb-6">Weather</p>

        {/* Min / Max (UNCHANGED DESIGN) */}
        <div className="flex flex-col items-center gap-3 text-sm opacity-90">
          <div className="flex items-center gap-2">
            <span className="opacity-70">Min</span>
            <div className="w-px h-4 bg-white/50"></div>
            <span className="font-medium">{min}°C</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="opacity-70">Max</span>
            <div className="w-px h-4 bg-white/50"></div>
            <span className="font-medium">{max}°C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureCard;
