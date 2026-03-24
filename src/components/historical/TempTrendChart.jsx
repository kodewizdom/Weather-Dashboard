import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const TempTrendChart = ({ data, unit }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">
        Temperature Trend (Monthly)
      </h2>

      <div className="h-80 overflow-x-auto">
        <div className="min-w-175 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />

              <Tooltip
                formatter={(value) => `${value}°${unit}`}
              />

              <Legend/>

              <Line dataKey="min" stroke="#3b82f6" dot={false} />
              <Line dataKey="max" stroke="#ef4444" dot={false} />
              <Line dataKey="mean" stroke="#10b981" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TempTrendChart;

