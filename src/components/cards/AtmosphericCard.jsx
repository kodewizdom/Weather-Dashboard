import { CloudRainWind } from "lucide-react";

const AtmosphericCard = ({ data }) => {
  const precipitation = data?.current?.precipitation;
  const humidity = data?.current?.relative_humidity_2m;
  const uv = data?.current?.uv_index;

  const formatValue = (value, unit = "") =>
    value !== undefined && value !== null
      ? `${value}${unit}`
      : "--";

  const getUVColor = (value) => {
    if (value == null) return "text-gray-400";
    if (value <= 2) return "text-green-500";
    if (value <= 5) return "text-yellow-500";
    if (value <= 7) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5">
      <h2 className="text-gray-500 text-sm mb-4 flex items-center gap-2">
        <CloudRainWind size={16} /> Atmospheric
      </h2>

      <div className="bg-gray-50 rounded-xl p-4 space-y-4">
        {/* Precipitation */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Precipitation</span>
          <span className="text-sm font-semibold text-gray-800">
            {formatValue(precipitation, " mm")}
          </span>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Humidity */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Humidity</span>
          <span className="text-sm font-semibold text-gray-800">
            {formatValue(humidity, "%")}
          </span>
        </div>

        <div className="h-px bg-gray-200" />

        {/* UV Index */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">UV Index</span>
          <span
            className={`text-sm font-semibold ${getUVColor(uv)}`}
          >
            {formatValue(uv)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AtmosphericCard;