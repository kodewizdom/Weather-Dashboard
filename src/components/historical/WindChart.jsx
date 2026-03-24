import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const WindChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm text-gray-500 mb-4">
          Wind Trend (Monthly)
        </h2>
        <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      </div>
    );
  }

  const formatTooltip = (value, name, props) => {
    const key = props.dataKey;

    if (key === "speed") return [`${value} km/h`, "Speed"];
    if (key === "direction") return [`${value}°`, "Direction"];

    return [value, name];
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">
        Wind Trend (Monthly)
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

              {/* Speed axis */}
              <YAxis
                yAxisId="left"
                stroke="#ec4899"
              />

              {/* Direction axis */}
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6366f1"
                domain={[0, 360]}
              />

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
                dataKey="speed"
                name="Speed"
                stroke="#ec4899"
                strokeWidth={2}
                dot={false}
                yAxisId="left"
              />

              <Line
                type="monotone"
                dataKey="direction"
                name="Direction"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                yAxisId="right"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WindChart;