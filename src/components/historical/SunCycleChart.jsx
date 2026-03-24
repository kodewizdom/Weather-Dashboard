import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SunCycleChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm text-gray-500 mb-4">
          Sunrise & Sunset Trend (IST)
        </h2>
        <div className="h-80 flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      </div>
    );
  }


  const formatTime = (val) => {
    const h = Math.floor(val);
    const m = Math.round((val % 1) * 60);
    return `${h}:${m.toString().padStart(2, "0")}`;
  };

  const formatTooltip = (value, name) => {
    return [formatTime(value), name === "sunrise" ? "Sunrise" : "Sunset"];
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">
        Sunrise & Sunset Trend (IST)
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

              <YAxis
                domain={[4, 20]}
                stroke="#9ca3af"
                tickFormatter={formatTime}
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
                dataKey="sunrise"
                name="Sunrise"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="sunset"
                name="Sunset"
                stroke="#6366f1"
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

export default SunCycleChart;