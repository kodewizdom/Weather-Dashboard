import { MapPin } from "lucide-react";
import { getWeatherIcon } from "../../utils/weatherIcons";

const TemperatureCard = ({ data, city, unit }) => {
  // skeleton
  if (!data?.current || !data?.daily) {
    return (
      <div
        className="rounded-3xl p-6 md:p-8 min-h-94 text-white shadow-xl 
      bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 
      flex flex-col justify-center items-center gap-4 animate-pulse"
      >
        <div className="w-12 h-12 bg-white/30 rounded-full"></div>
        <div className="w-24 h-6 bg-white/30 rounded"></div>
        <div className="w-32 h-10 bg-white/30 rounded"></div>
      </div>
    );
  }

  const convertTemp = (temp) =>
    unit === "F" ? ((temp * 9) / 5 + 32).toFixed(1) : temp.toFixed(1);

  const currentTemp = convertTemp(data.current.temperature_2m);
  const minTemp = convertTemp(data.daily.temperature_2m_min?.[0]);
  const maxTemp = convertTemp(data.daily.temperature_2m_max?.[0]);

  const code = data.current.weather_code;
  const isDay = data.current.is_day === 1;

  return (
    <div
      className="rounded-3xl p-6 md:p-8 text-white shadow-xl 
    bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500"
    >
      {/* location */}
      <div className="flex items-center gap-2 text-sm opacity-90">
        <MapPin size={16} />
        <span className="font-medium">{city || "—"}</span>
      </div>

      {/* main content */}
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="text-6xl mb-5">{getWeatherIcon(code, isDay, 64)}</div>

        <p className="text-7xl font-bold leading-none mb-2 tracking-tight">
          {currentTemp}°{unit}
        </p>

        <p className="text-sm opacity-80 mb-6">{isDay ? "Day" : "Night"}</p>

        {/* min/max */}
        <div className="flex flex-col items-center gap-3 text-sm opacity-90">
          <div className="flex items-center gap-2">
            <span className="opacity-70">Min</span>
            <div className="w-px h-4 bg-white/50"></div>
            <span className="font-medium">
              {minTemp}°{unit}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="opacity-70">Max</span>
            <div className="w-px h-4 bg-white/50"></div>
            <span className="font-medium">
              {maxTemp}°{unit}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureCard;
