import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AirQualityChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">
        Air Quality (PM10 & PM2.5)
      </h2>

      <div className="h-72 overflow-x-auto">
        <div className="min-w-[700px] h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />

              <Tooltip
                formatter={(value, name) => {
                  if (name === "pm10") return `${value} µg/m³`;
                  if (name === "pm25") return `${value} µg/m³`;
                  return value;
                }}
              />

              <Legend />

              <Line dataKey="pm10" stroke="#f97316" dot={false} />
              <Line dataKey="pm25" stroke="#ef4444" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AirQualityChart;