import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PrecipitationChart = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm text-gray-500 mb-4">
          Monthly Rainfall (mm)
        </h2>
        <div className="h-80 flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      </div>
    );
  }

  const formatTooltip = (value) => [`${value} mm`, "Rainfall"];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">
        Monthly Rainfall (mm)
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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

            <Bar
              dataKey="rain"
              name="Rainfall"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PrecipitationChart;