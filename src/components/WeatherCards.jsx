import TemperatureCard from "./cards/TemperatureCard";
import WindCard from "./cards/WindCard";
import AtmosphericCard from "./cards/AtmosphericCard";
import SunCycleCard from "./cards/SunCycleCard";
import AirQualityCard from "./cards/AirQualityCard";
import WeeklyForecast from "./cards/WeeklyForecast";

const WeatherCards = ({ weather,city}) => {
  return (
    <div className=" p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row justify-between bg-[#F0F5FF]">
      {/* LEFT SECTION (30%) */}
      <div className=" w-full lg:w-[25%] flex flex-col gap-6">
        <TemperatureCard  data={weather} city={city}/>
        <WindCard />
      </div>

      {/* RIGHT SECTION (70%) */}
      <div className="w-full lg:w-[70%] flex flex-col gap-6">
        {/* 7-Day Forecast */}
        <WeeklyForecast/>

        {/* Grid below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AtmosphericCard />
          <SunCycleCard />
        </div>

        <AirQualityCard />
      </div>
    </div>
  );
};

export default WeatherCards;
