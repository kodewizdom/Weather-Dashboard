import { getWeatherIcon } from "../../utils/weatherIcons";

const WeeklyForecast = ({ data, unit }) => {
  const days = data?.daily?.time || [];
  const maxTemps = data?.daily?.temperature_2m_max || [];
  const minTemps = data?.daily?.temperature_2m_min || [];
  const codes = data?.daily?.weather_code || [];

  // ---------------- SKELETON ----------------
  if (!days.length) {
    return (
      <div className="flex justify-between overflow-x-auto pt-5 pb-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="min-w-[95px] shrink-0 rounded-2xl p-4 text-center shadow-sm bg-gray-200 animate-pulse"
          >
            <div className="w-6 h-6 bg-gray-300 rounded-full mx-auto mb-2" />
            <div className="h-3 bg-gray-300 rounded w-10 mx-auto mb-2" />
            <div className="h-4 bg-gray-300 rounded w-8 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  const todayStr = new Date().toLocaleDateString("en-CA");

  let todayIndex = days.findIndex((d) => d === todayStr);
  if (todayIndex === -1) todayIndex = 0;

  const convertTemp = (temp) =>
    unit === "F"
      ? Math.round((temp * 9) / 5 + 32)
      : Math.round(temp);

  const forecast = [];

  for (let i = 0; i < days.length; i++) {
    if (!days[i] || maxTemps[i] == null || minTemps[i] == null) continue;

    const date = new Date(days[i]);

    const max = convertTemp(maxTemps[i]);
    const min = convertTemp(minTemps[i]);
    const avg = Math.round((max + min) / 2);

    forecast.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      avg,
      code: codes[i] ?? 0,
      isToday: i === todayIndex,
    });
  }

  let sliced = forecast.slice(0, 7);

  const centerIndex = 3;
  let safety = 0;

  while (!sliced[centerIndex]?.isToday && safety < 10) {
    sliced.push(sliced.shift());
    safety++;
  }

  return (
    <div className="flex gap-5 justify-between overflow-x-auto pt-5 pb-1">
      {sliced.map((item, i) => (
        <div
          key={i}
          className={`min-w-[95px] shrink-0 rounded-2xl p-4 text-center shadow-sm transition
          ${
            item.isToday
              ? "bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg"
              : "bg-white text-gray-700"
          }`}
        >
          <div className="text-2xl mb-2">
            {getWeatherIcon(item.code, true, 24)}
          </div>

          <p className="text-sm">
            {item.isToday ? "Today" : item.day}
          </p>

          <p className="text-sm font-semibold mt-1">
            {item.avg}°{unit}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;