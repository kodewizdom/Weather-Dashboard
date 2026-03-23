import LineChartCard from "../components/charts/LineChartCard";
import PMChart from "./charts/PMChart";

const Analytics = ({ weather,air,unit }) => {
  if (!weather || !weather.hourly || !air || !air.hourly) {
  return (
    <div className="p-4 md:p-6 lg:p-8 bg-[#fff0f9] min-h-screen flex items-center justify-center">
      <p className="text-gray-500 animate-pulse">Loading charts...</p>
    </div>
  );
}

  const hourlyData = weather.hourly.time.slice(0, 12).map((time, index) => {
  let temp = weather.hourly.temperature_2m[index];

  if (unit === "F") {
    temp = (temp * 9) / 5 + 32;
  }

  return {
    time: new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
    }),
    temp: temp.toFixed(1),
    humidity: weather.hourly.relative_humidity_2m[index],
    precipitation: weather.hourly.precipitation[index],
    visibility: (weather.hourly.visibility[index] / 1000).toFixed(1),
    wind: weather.hourly.wind_speed_10m[index],
  };
});

  const pmData = air.hourly.time.slice(0, 12).map((time, index) => ({
  time: new Date(time).toLocaleTimeString([], { hour: "2-digit" }),
  pm10: air.hourly.pm10?.[index] ?? 0,
  pm25: air.hourly.pm2_5?.[index] ?? 0,
}));

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-[#fff0f9] min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <LineChartCard
          data={hourlyData}
          dataKey="temp"
          color="#3b82f6"
          title="Temperature (Hourly)"
          unit={unit}
        />

        <LineChartCard
          data={hourlyData}
          dataKey="humidity"
          color="#10b981"
          title="Relative Humidity (%)"
        />

        <LineChartCard
          data={hourlyData}
          dataKey="precipitation"
          color="#6366f1"
          title="Precipitation (mm)"
        />

        <LineChartCard
          data={hourlyData}
          dataKey="visibility"
          color="#f59e0b"
          title="Visibility (km)"
        />

        <LineChartCard
          data={hourlyData}
          dataKey="wind"
          color="#ec4899"
          title="Wind Speed (km/h)"
        />
        
        {pmData.length > 0 && <PMChart data={pmData} />}
      </div>
    </div>
  );
};

export default Analytics;
