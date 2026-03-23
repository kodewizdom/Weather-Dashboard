import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer,} from "recharts";

const LineChartCard = ({ data, dataKey, color, title,unit}) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-sm text-gray-500 mb-4">{title}</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" tick={{ fontSize: 10 }} />
            <YAxis />

            
            <Tooltip
              formatter={(value) => {
                if (dataKey === "temp") return `${value}°${unit}`;
                if (dataKey === "humidity") return `${value}%`;
                if (dataKey === "precipitation") return `${value} mm`;
                if (dataKey === "visibility") return `${value} km`;
                if (dataKey === "wind") return `${value} km/h`;
                return value;
              }}
            />

            
            <Line
              type="monotone"
              dataKey={dataKey}
              name={title}
              stroke={color}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;