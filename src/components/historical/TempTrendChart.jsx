import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TempTrendChart = ({ data = [], unit }) => {
  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm text-gray-500 mb-4">
          Temperature Trend (Monthly)
        </h2>
        <div className="h-80 flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      </div>
    );
  }

  const formatTooltip = (value) => `${value}°${unit}`;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">
        Temperature Trend (Monthly)
      </h2>

      <div className="h-80 overflow-x-auto">
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
                dataKey="min"
                name="Min"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="max"
                name="Max"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="mean"
                name="Avg"
                stroke="#10b981"
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

export default TempTrendChart;