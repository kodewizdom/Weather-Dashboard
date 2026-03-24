import { useMemo, useState } from "react";
import DateRangePicker from "../components/historical/DateRangePicker";
import TempTrendChart from "../components/historical/TempTrendChart";
import SunCycleChart from "../components/historical/SunCycleChart";
import PrecipitationChart from "./historical/PrecipitationChart";
import WindChart from "../components/historical/WindChart";
import AirQualityChart from "../components/historical/AirQualityChart";
import { useHistorical } from "./hooks/useHistorical";

const formatDate = (yearsAgo = 0, daysOffset = 0) => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - yearsAgo);
  d.setDate(d.getDate() - daysOffset);
  return d.toISOString().split("T")[0]; 
};

const Historical = ({ location, unit }) => {
  const lat = location?.lat;
  const lon = location?.lon;

  const [startDate, setStartDate] = useState(formatDate(1, 1));
  const [endDate, setEndDate] = useState(formatDate(0, 1));

  const {
    tempMonthly,
    sunMonthly,
    precipMonthly,
    windMonthly,
    airMonthly,
    loading,
  } = useHistorical(lat, lon, startDate, endDate, unit);

  const isReady = useMemo(() => lat && lon, [lat, lon]);

  if (!isReady) {
    return <div className="p-6 text-gray-500">Getting location...</div>;
  }

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

      {loading ? (
        <div className="text-sm text-gray-500">Loading data...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TempTrendChart data={tempMonthly} unit={unit} />
            <SunCycleChart data={sunMonthly} />
            <PrecipitationChart data={precipMonthly} />
            <WindChart data={windMonthly} />
          </div>

          <div className="mt-6">
            <AirQualityChart data={airMonthly} />
          </div>
        </>
      )}
    </div>
  );
};

export default Historical;
