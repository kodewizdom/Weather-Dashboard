import TemperatureCard from "./cards/TemperatureCard";
import WindCard from "./cards/WindCard";
import AtmosphericCard from "./cards/AtmosphericCard";
import SunCycleCard from "./cards/SunCycleCard";
import AirQualityCard from "./cards/AirQualityCard";
import WeeklyForecast from "./cards/WeeklyForecast";

const Dashboard = ({ weather,city,air,unit}) => {
  return (
    <div className=" p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row justify-between bg-[#F0F5FF]">
      {/* LEFT SECTION */}
      <div className=" w-full lg:w-[25%] flex flex-col gap-6">
        <TemperatureCard  data={weather} city={city} unit={unit}/>
        <WindCard data={weather}/>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-[72%] flex flex-col gap-6">
        <WeeklyForecast data={weather} unit={unit}/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AtmosphericCard data={weather}/>
          <SunCycleCard data={weather} city={city}/>
        </div>

        <AirQualityCard data={air} city={city}/>
      </div>
    </div>
  );
};

export default Dashboard;
