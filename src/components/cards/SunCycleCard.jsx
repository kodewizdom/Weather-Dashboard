import { MapPin, Moon, Sun } from "lucide-react";

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
        {/* location */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <MapPin size={16} />
          <span>{city || "—"}</span>
        </div>

        
        <div className="flex justify-between items-center">
          {/* sunrise */}
          <div className="flex items-center gap-3">
            <Sun size={22} />
            <div>
              <p className="text-xs text-gray-400">Sunrise</p>
              <p className="text-sm font-semibold text-gray-800">
                {sunrise}
              </p>
            </div>
          </div>

          {/* sunset */}
          <div className="flex items-center gap-3">
            <Moon size={22} />
            <div>
              <p className="text-xs text-gray-400">Sunset</p>
              <p className="text-sm font-semibold text-gray-800">
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