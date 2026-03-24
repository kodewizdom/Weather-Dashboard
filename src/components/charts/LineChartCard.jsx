import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatValue = (key, value, unit) => {
  switch (key) {
    case "temp":
      return `${value}°${unit}`;
    case "humidity":
      return `${value}%`;
    case "precipitation":
      return `${value} mm`;
    case "visibility":
      return `${value} km`;
    case "wind":
      return `${value} km/h`;
    default:
      return value;
  }
};

const LineChartCard = ({
  data = [],
  dataKey,
  color = "#4f46e5",
  title,
  unit,
}) => {
  if (!data.length) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h2 className="text-sm text-gray-500 mb-4">{title}</h2>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">{title}</h2>

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
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                fontSize: "12px",
              }}
              formatter={(value) => formatValue(dataKey, value, unit)}
            />

            <Line
              type="monotone"
              dataKey={dataKey}
              name={title}
              stroke={color}
              strokeWidth={2}
              dot={true}              
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;