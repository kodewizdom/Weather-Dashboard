import TemperatureCard from "../components/cards/TemperatureCard";
import WindCard from "../components/cards/WindCard";
import AtmosphericCard from "../components/cards/AtmosphericCard";
import SunCycleCard from "../components/cards/SunCycleCard";
import AirQualityCard from "../components/cards/AirQualityCard";
import WeeklyForecast from "../components/cards/WeeklyForecast";

const Dashboard = ({ weather, city, air, unit }) => {

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-[#F0F5FF] min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-[25%] flex flex-col gap-6">
          <TemperatureCard data={weather} city={city} unit={unit} />
          <WindCard data={weather} />
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-[75%] flex flex-col gap-6">
          <WeeklyForecast data={weather} unit={unit} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AtmosphericCard data={weather} />
            <SunCycleCard data={weather} city={city} />
          </div>

          <AirQualityCard data={air} city={city} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;