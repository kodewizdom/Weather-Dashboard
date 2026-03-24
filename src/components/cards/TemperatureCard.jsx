import { MapPin } from "lucide-react";
import { getWeatherIcon } from "../../utils/weatherIcons";

const TemperatureCard = ({ data, city,unit }) => {
  if (!data) {
  return (
    <div className="relative rounded-3xl p-6 md:p-8 min-h-80 text-white shadow-xl 
    bg-linear-to-br from-blue-400 via-blue-500 to-indigo-500 flex flex-col justify-center items-center gap-4 animate-pulse">

      <div className="w-12 h-12 bg-white/30 rounded-full"></div>

      <div className="w-24 h-6 bg-white/30 rounded"></div>

      <div className="w-32 h-10 bg-white/30 rounded"></div>

    </div>
  );
}

  const convertTemp = (temp) => {
  return unit === "F"
    ? ((temp * 9) / 5 + 32).toFixed(1)
    : temp.toFixed(1);
};

const temp = convertTemp(data.current.temperature_2m);
const min = convertTemp(data.daily.temperature_2m_min[0]);
const max = convertTemp(data.daily.temperature_2m_max[0]);
  const code = data?.current?.weather_code;
  const isDay = data?.current?.is_day === 1;

  return (
    <div
      className="relative rounded-3xl p-6 md:p-8 text-white shadow-xl overflow-visible 
    bg-linear-to-br from-blue-400 via-blue-500 to-indigo-500"
    >
      
      <div className="flex items-center gap-2 text-sm opacity-90">
        <MapPin />
        <span className="font-medium">{city || "Loading..."}</span>
      </div>

      
      <div className="flex flex-col items-center justify-center mt-8">
        <div className="text-6xl mb-5">{getWeatherIcon(code, isDay, 64)}</div>

        {/* 
        <p className="text-sm opacity-90 mb-2">
          Today
        </p> */}

        <p className="text-7xl font-bold leading-none mb-2 tracking-tight">
          {temp}°{unit}
        </p>

        <p className="text-lg opacity-90 mb-6">Weather</p>

        <div className="flex flex-col items-center gap-3 text-sm opacity-90">
          <div className="flex items-center gap-2">
            <span className="opacity-70">Min</span>
            <div className="w-px h-4 bg-white/50"></div>
            <span className="font-medium">{min}°{unit}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="opacity-70">Max</span>
            <div className="w-px h-4 bg-white/50"></div>
            <span className="font-medium">{max}°{unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureCard;
