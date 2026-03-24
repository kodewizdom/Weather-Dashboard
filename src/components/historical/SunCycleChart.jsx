import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SunCycleChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">
        Sunrise & Sunset Trend (IST)
      </h2>

      <div className="h-80 overflow-x-auto">
        <div className="min-w-[700px] h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis
                domain={[4, 20]}
                tickFormatter={(val) => `${Math.floor(val)}:${(val % 1) * 60}`}
              />

              <Tooltip
                formatter={(val) => {
                  const h = Math.floor(val);
                  const m = Math.round((val % 1) * 60);
                  return `${h}:${m.toString().padStart(2, "0")}`;
                }}
              />

              <Legend />

              <Line dataKey="sunrise" stroke="#f59e0b" dot={false} />
              <Line dataKey="sunset" stroke="#6366f1" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SunCycleChart;