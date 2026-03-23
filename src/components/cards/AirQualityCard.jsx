import { MapPin, Wind } from "lucide-react";
import React from "react";

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

const getAQIStatus = (aqi) => {
  if (aqi == null) return { label: "--", color: "text-gray-400" };

  if (aqi <= 50) return { label: "Good", color: "text-green-500" };
  if (aqi <= 100) return { label: "Moderate", color: "text-yellow-500" };
  if (aqi <= 150)
    return {
      label: "Unhealthy for Sensitive Groups",
      color: "text-orange-500",
    };
  if (aqi <= 200) return { label: "Unhealthy", color: "text-red-500" };
  if (aqi <= 300)
    return { label: "Very Unhealthy", color: "text-purple-500" };

  return { label: "Hazardous", color: "text-black" };
};

const AirQualityCard = ({ data, city }) => {
  const pm10 = data?.current?.pm10 ?? "--";
  const pm25 = data?.current?.pm2_5 ?? "--";
  const co = data?.current?.carbon_monoxide ?? "--";
  const no2 = data?.current?.nitrogen_dioxide ?? "--";
  const so2 = data?.current?.sulphur_dioxide ?? "--";
  const o3 = data?.current?.ozone ?? "--";

  const aqi = calculateAQI(pm25);
  const { label, color } = getAQIStatus(aqi);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5 md:col-span-2 lg:col-span-2">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-600 text-sm font-medium">
          Air Quality Index
        </h2>

        <div className="text-sm text-gray-400 flex items-center gap-1">
          <MapPin /> <span>{city || "--"}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Wind />

          <span className={`font-medium ${color}`}>
            AQI
          </span>

          <div className="w-px h-4 bg-black"></div>

          <span>{aqi ?? "--"}</span>

          <p className={`text-sm ${color}`}>
            ({label})
          </p>
        </div>
      </div>

      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {[
          { label: "PM10", value: pm10 },
          { label: "PM2.5", value: pm25 },
          { label: "CO", value: co },
          { label: "O₃", value: o3 },
          { label: "NO₂", value: no2 },
          { label: "SO₂", value: so2 },
        ].map((item, index) => (
          <div key={index} className="bg-green-50 rounded-lg p-3 text-center">
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