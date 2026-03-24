import { useState } from "react";
import DateRangePicker from "../components/historical/DateRangePicker";
import TempTrendChart from "../components/historical/TempTrendChart";
import SunCycleChart from "../components/historical/SunCycleChart";
import PrecipitationChart from "./historical/PrecipitationChart";
import WindChart from "../components/historical/WindChart";
import AirQualityChart from "../components/historical/AirQualityChart";
import { useHistorical } from "./hooks/useHistorical";

const Historical = ({ location, unit }) => {
  const lat = location?.lat;
  const lon = location?.lon;
  const getDate = (yearsAgo = 0, daysOffset = 0) => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - yearsAgo);
    d.setDate(d.getDate() - daysOffset); // 👈 NEW
    return d.toLocaleDateString("en-CA");
  };

  // ✅ start = 1 year ago (same day)
  const [startDate, setStartDate] = useState(getDate(1, 1));

  // ✅ end = yesterday (safe)
  const [endDate, setEndDate] = useState(getDate(0, 1));

  const { tempMonthly, sunMonthly, precipMonthly, windMonthly, airMonthly } =
    useHistorical(lat, lon, startDate, endDate, unit);

  if (!lat || !lon) return <div className="p-6">Getting location...</div>;

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-[#F0F5FF] min-h-screen">
      <h2 className="text-xl font-semibold mb-6">
        Historical Weather Analysis
      </h2>

      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TempTrendChart data={tempMonthly} unit={unit} />
        <SunCycleChart data={sunMonthly} />
        <PrecipitationChart data={precipMonthly} />
        <WindChart data={windMonthly} />
      </div>
      <div className="grid grid-cols-1 mt-6">
        <AirQualityChart className="" data={airMonthly} />
      </div>
    </div>
  );
};

export default Historical;
