import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,Legend,} from "recharts";

const PMChart = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">
        Air Quality (PM10 & PM2.5)
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis />

            <Tooltip
              formatter={(value, name) => {
                if (name === "pm10") return [`${value}`, "PM10"];
                if (name === "pm25") return [`${value}`, "PM2.5"];
                return value;
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="pm10"
              stroke="#f97316"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="pm25"
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