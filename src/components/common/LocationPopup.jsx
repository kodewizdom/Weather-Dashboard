const LocationPopup = ({ onRetry }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center shadow-lg">
        
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Location Disabled
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Please enable location services and refresh the page.
        </p>

        <button
          onClick={onRetry}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          Retry
        </button>

      </div>
    </div>
  );
};

export default LocationPopup;