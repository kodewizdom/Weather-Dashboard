import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const AirQualityChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm text-gray-500 mb-4">
          Air Quality (PM10 & PM2.5)
        </h2>
        <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      </div>
    );
  }

  const formatTooltip = (value, name, props) => {
    const key = props.dataKey;

    if (key === "pm10") return [`${value} µg/m³`, "PM10"];
    if (key === "pm25") return [`${value} µg/m³`, "PM2.5"];

    return [value, name];
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">
        Air Quality (PM10 & PM2.5)
      </h2>

      <div className="h-72 overflow-x-auto">
        <div className="min-w-[700px] h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                tick={{ fontSize: 11 }}
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

              <Legend wrapperStyle={{ fontSize: "12px" }} />

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
    </div>
  );
};

export default AirQualityChart;