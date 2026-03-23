import React from "react";
import { getWeatherIcon } from "../../utils/weatherIcons";

const WeeklyForecast = ({ data, unit}) => {
  const days = data?.daily?.time || [];
  const maxTemps = data?.daily?.temperature_2m_max || [];
  const minTemps = data?.daily?.temperature_2m_min || [];
  const codes = data?.daily?.weather_code || [];

  if (!days.length) {
    return <div className="p-4">Loading forecast...</div>;
  }

  
  const todayStr = new Date().toLocaleDateString("en-CA");

  let todayIndex = days.findIndex((d) => d === todayStr);
  if (todayIndex === -1) todayIndex = 0;

  const forecast = [];

  const convertTemp = (temp)=>{
    if(unit ==="F"){
      return Math.round((temp*9)/5+32);
    }
    return Math.round(temp);
  }

  for (let i = 0; i < days.length; i++) {
    if (!days[i] || maxTemps[i] == null || minTemps[i] == null) continue;

    const date = new Date(days[i]);

    const max = convertTemp(maxTemps[i]);
    const min = convertTemp(minTemps[i]);
    const avg = Math.round((max + min) / 2);

    forecast.push({
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      max,
      min,
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
    <div className="flex justify-between gap-5 md:gap-0 overflow-x-auto pt-5 md:pt-0 pb-1">
      {sliced.map((item, index) => (
        <div
          key={index}
          className={`min-w-[95px] flex-shrink-0 rounded-2xl p-4 text-center shadow-sm transition
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

          {/* Min/Max */}
          {/* <p className="text-xs text-gray-400">
            {item.min}° / {item.max}°
          </p> */}
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecast;