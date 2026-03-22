import React from "react";

const data = [
  { day: "Sun", temp: "28°", icon: "⚡" },
  { day: "Mon", temp: "17°", icon: "💧" },
  { day: "Tue", temp: "20°", icon: "🌦️" },
  { day: "Wed", temp: "29°", icon: "⛈️", active: true },
  { day: "Thu", temp: "22°", icon: "🌬️" },
  { day: "Fri", temp: "16°", icon: "🌥️" },
  { day: "Sat", temp: "19°", icon: "🌧️" },
];

const WeeklyForecast = () => {
  return (
    <div className="flex justify-between gap-5 md:gap-0 overflow-x-auto pt-5 md:pt-0">

      {data.map((item, index) => (
        <div
          key={index}
          className={`min-w-[95px] flex-shrink-0 rounded-2xl p-4 text-center shadow-sm transition
          ${
            item.active
              ? "bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg"
              : "bg-white text-gray-700"
          }`}
        >
          {/* Icon */}
          <div className="text-2xl mb-2">{item.icon}</div>

          {/* Day */}
          <p className="text-sm">{item.day}</p>

          {/* Temp */}
          <p className="text-sm font-semibold mt-1">{item.temp}</p>
        </div>
      ))}

    </div>
  );
};

export default WeeklyForecast;