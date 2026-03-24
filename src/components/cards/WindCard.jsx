import { DropletIcon, Wind } from "lucide-react";

const WindCard = ({ data }) => {
  const today = new Date().toISOString().split("T")[0];

  const getTodayMax = (values, times) => {
    if (!values || !times) return "--";

    const todayValues = values.filter((_, i) => {
      const date = times[i]?.split("T")[0];
      return date === today;
    });

    return todayValues.length ? Math.max(...todayValues).toFixed(1) : "--";
  };

  const wind = getTodayMax(
    data?.hourly?.wind_speed_10m,
    data?.hourly?.time
  );

  const pop = getTodayMax(
    data?.hourly?.precipitation_probability,
    data?.hourly?.time
  );

  return (
    <div
      className="relative rounded-2xl p-5 text-white shadow-lg overflow-hidden
      bg-gradient-to-r from-pink-400 via-pink-500 to-red-400"
    >
      {/* Wind */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center gap-2">
          <Wind size={16} />
          <span className="font-medium">Max Wind</span>
        </div>

        <span className="opacity-90">
          {wind !== "--" ? `${wind} km/h` : "--"}
        </span>
      </div>

      {/* Rain probability */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <DropletIcon size={16} />
          <span className="font-medium">Max PoP</span>
        </div>

        <span className="opacity-90">
          {pop !== "--" ? `${pop}%` : "--"}
        </span>
      </div>

      
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
    </div>
  );
};

export default WindCard;