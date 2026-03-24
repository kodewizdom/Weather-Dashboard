const DateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const handleStartChange = (e) => {
    const value = e.target.value;
    if (endDate && value > endDate) return; 
    setStartDate(value);
  };

  const handleEndChange = (e) => {
    const value = e.target.value;
    if (startDate && value < startDate) return; 
    setEndDate(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex flex-col text-sm text-gray-500">
        <label className="mb-1">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartChange}
          max={endDate || undefined}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col text-sm text-gray-500">
        <label className="mb-1">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndChange}
          min={startDate || undefined}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;