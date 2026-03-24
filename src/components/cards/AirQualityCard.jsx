import { MapPin, Wind } from "lucide-react";

// AQI calculation (PM2.5)
const calculateAQI = (val) => {
  const pm25 = parseFloat(val);
  if (isNaN(pm25) || pm25 < 0) return null;

  const breakpoints = [
    { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50 },
    { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
    { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
    { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
    { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
    { cLow: 250.5, cHigh: 500.4, iLow: 301, iHigh: 500 },
  ];

  const bp = breakpoints.find((b) => pm25 <= b.cHigh) || breakpoints[5];

  const aqi =
    ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) *
      (pm25 - bp.cLow) +
    bp.iLow;

  return Math.round(aqi);
};

// AQI status
const getAQIStatus = (aqi) => {
  if (aqi == null) return { label: "--", color: "text-gray-400" };
  if (aqi <= 50) return { label: "Good", color: "text-green-500" };
  if (aqi <= 100) return { label: "Moderate", color: "text-yellow-500" };
  if (aqi <= 150)
    return { label: "Unhealthy (Sensitive)", color: "text-orange-500" };
  if (aqi <= 200) return { label: "Unhealthy", color: "text-red-500" };
  if (aqi <= 300) return { label: "Very Unhealthy", color: "text-purple-500" };
  return { label: "Hazardous", color: "text-black" };
};

const formatValue = (val) =>
  val !== undefined && val !== null ? val : "—";

const AirQualityCard = ({ data, city }) => {
  const current = data?.current || {};

  const pm10 = formatValue(current.pm10);
  const pm25 = formatValue(current.pm2_5);
  const co = formatValue(current.carbon_monoxide);
  const no2 = formatValue(current.nitrogen_dioxide);
  const so2 = formatValue(current.sulphur_dioxide);
  const co2 = formatValue(current.carbon_dioxide);

  const aqi = calculateAQI(pm25);
  const { label, color } = getAQIStatus(aqi);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5">
      {/* header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-600 text-sm font-medium">
          Air Quality Index
        </h2>

        <div className="text-sm text-gray-400 flex items-center gap-1">
          <MapPin size={16} />
          <span>{city || "—"}</span>
        </div>
      </div>

      {/* AQI */}
      <div className="flex items-center gap-3 mb-4">
        <Wind size={18} />

        <span className={`font-semibold ${color}`}>
          AQI {aqi ?? "—"}
        </span>

        <span className={`text-sm ${color}`}>
          ({label})
        </span>
      </div>

      {/* pollutants */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: "PM10", value: pm10 },
          { label: "PM2.5", value: pm25 },
          { label: "CO", value: co },
          { label: "CO₂", value: co2 },
          { label: "NO₂", value: no2 },
          { label: "SO₂", value: so2 },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-green-50 rounded-lg p-3 text-center"
          >
            <p className="text-sm font-semibold text-green-600">
              {item.value}
            </p>
            <p className="text-xs text-gray-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirQualityCard;