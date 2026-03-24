import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PMChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm text-gray-500 mb-4">
          Air Quality (PM10 & PM2.5)
        </h2>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      </div>
    );
  }

  const formatTooltip = (value, name) => {
    if (name === "pm10") return [`${value}`, "PM10"];
    if (name === "pm25") return [`${value}`, "PM2.5"];
    return [value, name];
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">
        Air Quality (PM10 & PM2.5)
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="time"
              tick={{ fontSize: 10 }}
              stroke="#9ca3af"
            />
            <YAxis stroke="#9ca3af" />

            <Tooltip
              formatter={formatTooltip}
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                fontSize: "12px",
              }}
            />

            <Legend
              wrapperStyle={{
                fontSize: "12px",
              }}
            />

            <Line
              type="monotone"
              dataKey="pm10"
              name="PM10"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="pm25"
              name="PM2.5"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PMChart;