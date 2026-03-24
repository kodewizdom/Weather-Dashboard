import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const WindChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">
        Wind Trend (Monthly)
      </h2>

      <div className="h-72 overflow-x-auto">
        <div className="min-w-[700px] h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />

              <Tooltip
                formatter={(value, name) => {
                  if (name === "speed") return `${value} km/h`;
                  if (name === "direction") return `${value}°`;
                  return value;
                }}
              />

              <Legend />

              <Line dataKey="speed" stroke="#ec4899" dot={false} />
              <Line dataKey="direction" stroke="#6366f1" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WindChart;